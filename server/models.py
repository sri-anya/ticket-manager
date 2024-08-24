from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from config import db, bcrypt
import datetime

from config import db

# Models go here!
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    # serialize_rules = ('-recipes.user', '-_password_hash',)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String)
    image_url = db.Column(db.String)
    role = db.Column(db.String)

    # relationships
    comments = db.relationship('Comment', back_populates='author', cascade='all, delete-orphan') #a user can leave multiple comments
    tickets_created = db.relationship('Ticket', back_populates='creator', cascade='all, delete-orphan') #a user can create multiple tickets

    tickets_assigned = association_proxy('ticket_assignees', 'user', creator=lambda user_obj: TicketAssignee(user=user_obj))

    @hybrid_property
    def password_hash(self):
        raise AttributeError('Password hashes may not be viewed.')

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))

    def __repr__(self):
        return f'<User {self.name}>'

class Ticket(db.Model, SerializerMixin):
    __tablename__ = 'tickets'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    summary = db.Column(db.String)
    status = db.Column(db.String) #open, in-progress, closed
    priority = db.Column(db.String) #low, medium, high
    due_date = db.Column(db.DateTime)
    created_by =  db.Column(db.Integer(), db.ForeignKey('users.id'))

    # relationships
    creator = db.realtionship('User', back_populates="tickets_created")
    comments = db.relationship('Comment', back_populates='ticket', cascade='all, delete-orphan') #a ticket can have multiple comments
    # Association proxy to get assignees for this user through assignees
    assignees = association_proxy('ticket_assignees', 'ticket', creator=lambda ticket_obj: TicketAssignee(ticket=ticket_obj))

    def __repr__(self):
        return f'<Ticket {self.title}: {self.assignee}>'
    
class Comment(db.Model, SerializerMixin):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    summary = db.Column(db.String, nullable=False)
    timestamp = db.Column(db.DateTime)
    
    user_id = db.Column(db.Integer(), db.ForeignKey('users.id'))
    ticket_id = db.Column(db.Integer(), db.ForeignKey('tickets.id'))

    author = db.relationship('User', back_populates="comments") # comment belongs to a user
    ticket = db.relationship('Ticket', back_populates="comments") #comment belongs to a user

    def __repr__(self):
        return f'<Comment {self.id}: {self.summary}>'
    

class TicketAssignee(db.Model, SerializerMixin):
    __tablename__ = 'ticket_assignees'

    id = db.Column(db.Integer, primary_key=True)
    
    role = db.Column(db.String(50), nullable=False)  # Role of the user in the ticket (e.g., Developer)
    assigned_on = db.Column(db.DateTime, default=datetime.utcnow)  # When the user was assigned
    active = db.Column(db.Boolean, default=True)  # Whether the user is currently active on the ticket
    
    ticket_id = db.Column(db.Integer, db.ForeignKey('tickets.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    ticket = db.relationship('Ticket', back_populates='ticket_assignees')
    user = db.relationship('User', back_populates='ticket_assignees')

    def __repr__(self):
        return f'<TagAssignee {self.id}: {self.active}>'


    