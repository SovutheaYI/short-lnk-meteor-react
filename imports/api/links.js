import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'simpl-schema/dist/SimpleSchema';
import shortid from 'shortid';

export const Links = new Mongo.Collection('links');

if (Meteor.isServer) {
    Meteor.publish('links', function () {
        return Links.find({userId: this.userId});
    });
}


Meteor.methods({
    'insert_links'(link) {
        if (!Meteor.userId) {
            throw new Meteor.Error('Not-authorized');
        }

        new SimpleSchema({
            url: {
                type: String,
                regEx: SimpleSchema.RegEx.Url
            }
        }).validate({
            url: link
        });

        Links.insert({
            _id: shortid.generate(),
            url: link,
            userId: this.userId,
            visible: true,
            visitedCount: 0,
            lastVisitedAt: null
        });
    },
    'link_visible'(id, visible) {
        if (!Meteor.userId) {
            throw new Meteor.Error('Not-authorized');
        }

        new SimpleSchema({
            id: {
                type: String,
                min: 1
            },
            visible: {
                type: Boolean,
            }
        }).validate({
            id: id,
            visible: visible
        });

        Links.update({_id: id, userId: this.userId}, {$set: {visible: visible}});
    },
    'tracker_link'(id) {
        new SimpleSchema({
            id: {
                type: String,
                min: 1
            }
        }).validate({
            id: id
        });

        Links.update({_id: id}, {
            $set: {
                lastVisitedAt: new Date().getTime()
            },
            $inc: {
                visitedCount: 1
            }
        });
    }
});