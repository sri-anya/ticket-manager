from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from config import db
import datetime

from config import db

# Models go here!
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = (
        '-comments.author',
        '-tickets_created',
        '-ticket_assignees',
        '-tickets_assigned',
        '-tickets_assigned.ticket',
        '-tickets_assigned.user'
    )

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    password_hash = db.Column(db.String)
    image_url = db.Column(db.String)
    role = db.Column(db.String)

    # relationships
    comments = db.relationship('Comment', back_populates='author', cascade='all, delete-orphan') #a user can leave multiple comments
    tickets_created = db.relationship('Ticket', back_populates='creator', cascade='all, delete-orphan') #a user can create multiple tickets
    ticket_assignees = db.relationship('TicketAssignee', back_populates='user', cascade='all, delete-orphan')
    tickets_assigned = association_proxy('ticket_assignees', 'ticket', creator=lambda ticket_obj: TicketAssignee(ticket=ticket_obj))

    

    def __repr__(self):
        return f'<User {self.name}>'

class Ticket(db.Model, SerializerMixin):
    __tablename__ = 'tickets'

    serialize_rules = (
        '-created_by',
        '-creator.tickets_created',
        '-creator.image_url',
        '-creator.password_hash'
        '-creator.comments',
        '-comments.ticket',
        '-ticket_assignees',
        '-ticket_assignees.user',
        '-ticket_assignees.ticket',
        '-tickets_created',
        '-tickets_created.id',
        '-tickets_created.email',
        '-tickets_created.image_url',
        '-tickets_created.role'
    )
    
    # ("title", "summary", "status", "priority", "due_date", "created_by")
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    summary = db.Column(db.String)
    status = db.Column(db.String) #open, in-progress, closed
    priority = db.Column(db.String) #low, medium, high
    due_date = db.Column(db.DateTime)
    created_by =  db.Column(db.Integer(), db.ForeignKey('users.id'))

    # relationships
    creator = db.relationship('User', back_populates="tickets_created")
    comments = db.relationship('Comment', back_populates='ticket', cascade='all, delete-orphan') #a ticket can have multiple comments
    ticket_assignees = db.relationship('TicketAssignee', back_populates='ticket', cascade='all, delete-orphan')
    # Association proxy to get assignees for this user through assignees

    assignees = association_proxy('ticket_assignees', 'user', creator=lambda user_obj: TicketAssignee(usert=user_obj))

    def __repr__(self):
        return f'<Ticket name:{self.title}, assignees: {self.assignees}, creator: {self.creator}>'
    
class Comment(db.Model, SerializerMixin):
    __tablename__ = 'comments'
    serialize_only = ('summary', 'ticket.id', 'author.name','author.email')
    serialize_rules = (
        '-id',
        '-ticket_id',
        '-author.comments',
        '-ticket.comments'
    )

    id = db.Column(db.Integer, primary_key=True)
    summary = db.Column(db.String, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.datetime(2024,2,2))
    
    user_id = db.Column(db.Integer(), db.ForeignKey('users.id'))
    ticket_id = db.Column(db.Integer(), db.ForeignKey('tickets.id'))

    author = db.relationship('User', back_populates="comments") # comment belongs to a user
    ticket = db.relationship('Ticket', back_populates="comments") # ticket belongs to a user

    def __repr__(self):
        return f'<Comment {self.id}: {self.summary}>'
    

class TicketAssignee(db.Model, SerializerMixin):
    __tablename__ = 'ticket_assignees'

    serialize_rules = (
        '-id',
        '-role',
        '-active',
        '-ticket_id',
        '-user_id',
        '-ticket',
        '-user'
    )

    id = db.Column(db.Integer, primary_key=True)
    
    role = db.Column(db.String(50), nullable=False)  # Role of the user in the ticket (e.g., Developer)
    # assigned_on = db.Column(db.DateTime, default=datetime.utcnow)  # When the user was assigned
    active = db.Column(db.Boolean, default=True)  # Whether the user is currently active on the ticket
    
    ticket_id = db.Column(db.Integer, db.ForeignKey('tickets.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    ticket = db.relationship('Ticket', back_populates='ticket_assignees')
    user = db.relationship('User', back_populates='ticket_assignees')

    def __repr__(self):
        return f'<TicketAssignee {self.id}: {self.role}>'


