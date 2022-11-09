#!/bin/bash

mongo <<EOF
  var cfg = {
        "_id": "rs",
        "version": 1,
        "members": [
            {
                "_id": 0,
                "host": "mongo-db-0:27017",
                "priority": 2
            },
            {
                "_id": 1,
                "host": "mongo-db-1:27017",
                "priority": 0
            },
            {
                "_id": 2,
                "host": "mongo-db-2:27017",
                "priority": 0
            }
        ]
    };
    rs.initiate(cfg, { force: true });
    //rs.reconfig(cfg, { force: true });
    rs.status();
EOF

sleep 10

mongo <<EOF
  use admin;
  admin = db.getSiblingDB("admin");
  admin.createUser(
    {
	user: "localuser",
        pwd: "localpass",
        roles: [ { role: "root", db: "admin" } ]
    });
    db.getSiblingDB("admin").auth("admin", "password");
    rs.status();
EOF