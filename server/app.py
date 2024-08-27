#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, jsonify
from flask_restful import Resource
from werkzeug.exceptions import NotFound

# Local imports
from config import app, db, api
# Add your model imports
from models import User, Ticket, Comment, TicketAssignee

# Views go here!

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
            due_date = data['due_date']
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


api.add_resource(Tickets, '/tickets')
api.add_resource(TicketByID, '/tickets/<int:id>')
api.add_resource(UserByID, '/users/<int:id>')

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