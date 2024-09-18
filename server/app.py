#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, jsonify, session
from flask_restful import Resource
from werkzeug.exceptions import NotFound

# Local imports
from config import app, db, api
# Add your model imports
from models import User, Ticket, Comment, TicketAssignee

# Views go here!
class Comments(Resource):
    
    def get(self, id):
        ticket = Ticket.query.filter_by(id=id).first()
        if ticket:
            comments = [comment.to_dict() for comment in Comment.query.all() ]
            return make_response(jsonify(comments), 200)
        else:
            return make_response({"message":"record not found"},404)
    
    def post(self, id):
        data = request.get_json()
        ticket = Ticket.query.filter_by(id=id).first()
        
        if not ticket:
            return make_response({"message": "Ticket not found"}, 404)
        
        new_comment = Comment(
            summary=data['summary'],
            user_id=data['user_id'],
            ticket_id=id  # Correct field name to reference the ticket
        )

        db.session.add(new_comment)
        db.session.commit()

        # Fetch the updated ticket to include the new comment
        updated_ticket = Ticket.query.filter_by(id=id).first()

        if not updated_ticket:
            return make_response({"message": "Ticket not found after adding comment"}, 404)
        
        return make_response(updated_ticket.to_dict(), 200)
class Assignees(Resource):
    
    def get(self, id):
        ticket = Ticket.query.filter_by(id=id).first()
        if ticket:
            assignees = [ticketAssignee.to_dict() for ticketAssignee in ticket.assignees]
            return make_response(jsonify(assignees), 200)
        else:
            return make_response({"message":"record not found"},404)
    
    def post(self, id):
        data = request.get_json()
        ticket = Ticket.query.filter_by(id=id).first()
        
        if not ticket:
            return make_response({"message": "Ticket not found"}, 404)
        
        new_assignee = TicketAssignee(
            role=data['role'],
            user_id=data['user_id'],
            ticket_id=id  # Correct field name to reference the ticket
        )

        db.session.add(new_assignee)
        db.session.commit()

        # Fetch the updated ticket to include the new comment
        updated_ticket = Ticket.query.filter_by(id=id).first()

        if not updated_ticket:
            return make_response({"message": "Ticket not found after adding comment"}, 404)
        
        return make_response(updated_ticket.to_dict(), 200)

class Tickets(Resource):

    def get(self):
        tickets = [ticket.to_dict() for ticket in Ticket.query.all()]
        return make_response(jsonify(tickets), 200)
    
    def post(self):
        data = request.get_json()

        new_ticket = Ticket(
            title=data['title'],
            summary=data['summary'],
            status=data['status'],
            priority = data['priority'],
            created_by = data['created_by']
        )

        db.session.add(new_ticket)
        db.session.commit()

        return make_response(new_ticket.to_dict(), 201)
    
class TicketByID(Resource):
    def get(self, id):
        ticket = Ticket.query.filter_by(id=id).first()
        if ticket:
            return make_response(jsonify(ticket.to_dict()), 200)
        else:
            return make_response({"message":"record not found"},404)

    def patch(self, id):
        data = request.get_json()

        ticket = Ticket.query.filter_by(id=id).first()
        if ticket:
            for attr in data:
                setattr(ticket, attr, data[attr])

            db.session.add(ticket)
            db.session.commit()

            return make_response(ticket.to_dict(), 200)
        else:
            return make_response({"message":"record not found"},404)


    def delete(self, id):
        ticket = Ticket.query.filter_by(id=id).first()
        if ticket:
            db.session.delete(ticket)
            db.session.commit()

            return make_response('', 204)
        else:
            return make_response({"message":"record not found"},404)
        
class UserByID(Resource):
    def get(self, id):
        user = User.query.filter_by(id=id).first()
        if user:
            return make_response(jsonify(user.to_dict()), 200)
        else:
            return make_response({"message":"record not found"},404)

    def patch(self, id):
        data = request.get_json()

        user = User.query.filter_by(id=id).first()
        if user:
            for attr in data:
                setattr(user, attr, data[attr])

            db.session.add(user)
            db.session.commit()

            return make_response(user.to_dict(), 200)
        else:
            return make_response({"message":"record not found"},404)


    def delete(self, id):
        user = User.query.filter_by(id=id).first()
        if user:
            db.session.delete(user)
            db.session.commit()

            return make_response('', 204)
        else:
            return make_response({"message":"record not found"},404)

class Login(Resource):
    def post(self):

        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        user = User.query.filter(User.email == email).first()

        if user and user.authenticate(password):

            session['user_id'] = user.id
            return user.to_dict(), 200

        return {'error': '401 Unauthorized'}, 401


class CheckSession(Resource):

    def get(self):
        user_id = session.get('user_id')
        if user_id:
            user = User.query.filter(User.id == user_id).first()
            if user:
                return user.to_dict(), 200
        
        return {}, 401
    
class Logout(Resource):
    def delete(self):
        if session['user_id'] == None:
            return {}, 401
        
        session['user_id'] = None

        return {}, 204
    
class Signup(Resource):
    def get(self):
        return {"message": "Signup get method"}, 200

    def post(self):
        data = request.get_json()
        name = data.get('name')
        email = data.get('email')
        password = data.get('password')
        password_confirmation = data.get('password_confirmation')
        image_url = data.get('image_url')
        role = data.get('role')

        errors = []

        # # Validate input
        if not email:
            return ({'errors': 'email is required'}), 422
        if not password:
            return ({'errors': 'password is required'}), 422
       
        if password != password_confirmation:
            return {'errors':'Password and confirmation do not match.'}, 422
        if len(password) < 6:
            return {'errors':'Password must be at least 6 characters long.'}, 422
        # if User.query.filter_by(email=email).first():
        #     return {'Username already exists.'}, 422

        
        # Create new user
        new_user = User(name=name, email=email, image_url=image_url, role=role)
        new_user.password_hash = password
        try:
            db.session.add(new_user)
            db.session.commit()

            # Save user ID in session
            session['user_id'] = new_user.id

            # Return success response
            return new_user.to_dict(), 201
        except:
            return {"unauthorized action"}, 422
        
api.add_resource(Tickets, '/tickets')
api.add_resource(Comments, '/tickets/<int:id>/comments')
api.add_resource(Assignees, '/tickets/<int:id>/assignees')
api.add_resource(TicketByID, '/tickets/<int:id>')
api.add_resource(UserByID, '/users/<int:id>')
api.add_resource(Login, '/login')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Logout, '/logout', endpoint='logout')
api.add_resource(Signup, '/signup', endpoint='signup')

@app.errorhandler(NotFound)
def handle_not_found(e):

    response = make_response(
        "Not Found: The requested resource does not exist.",
        404
    )

    return response

app.register_error_handler(404, handle_not_found)

if __name__ == '__main__':
    app.run(port=5555, debug=True)