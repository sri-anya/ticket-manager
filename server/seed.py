#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Ticket, TicketAssignee, Comment

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!
        print("start seeding...")
        User.query.delete()
        Ticket.query.delete()
        TicketAssignee.query.delete()
        Comment.query.delete()

        # Add users
        e1 = User(name="Uri Lee", email="uri@uri.com", role="developer")
        e1.password_hash = "uriLee"
        e2 = User(name="Tristan Tal", email="tristan@tristan.com", role="tester")
        e2.password_hash = "tristanTal"
        e3 = User(name="Sasha Hao", email="sasha@sasha.com", role="manager")
        e3.password_hash = "sashaHao"
        e4 = User(name="Taylor Jai", email="taylor@taylor.com", role="developer")
        e4.password_hash = "taylorJai"
        db.session.add_all([e1, e2, e3, e4])
        db.session.commit()
        

        # Add Tickets
        t1 = Ticket(title="make a gitHub account", summary="make a gitHub account and share gitHub URL", status="open", priority="low", creator=e1)
        t2 = Ticket(title="make a new repo", summary="give project name and clone it on your local", status="open", priority="low", creator=e1)
        t3 = Ticket(title="start installing required packages", summary="don't install unncessary packages", status="open", priority="medium", creator=e2)
        db.session.add_all([t1, t2, t3])
        db.session.commit()

        #Add Comments
        c1 = Comment(summary = "easy task", author=e4, ticket = t2)
        c2 = Comment(summary = "tough task", author=e3, ticket = t1)
        c3 = Comment(summary = "important task", author=e1, ticket = t3)
        db.session.add_all([c1, c2, c3])
        db.session.commit()
        
        ta1 = TicketAssignee(role = "developer" , ticket=t1, user=e1)
        ta2 = TicketAssignee(role = "developer" , ticket=t1, user=e2)
        ta3 = TicketAssignee(role = "developer" , ticket=t2, user=e4)
        db.session.add_all([ta1, ta2, ta3])
        db.session.commit()
