 mongodump  --db officeMap --collection floors
 
 mongorestore --collection floors --db officeMap dump/officeMap/floors.bson
 
 mongodump  --db officeMap --collection rooms
 
 mongorestore --collection rooms --db officeMap dump/officeMap/rooms.bson
  
 mongodump  --db officeMap --collection workers
 
 mongorestore --collection workers --db officeMap dump/officeMap/workers.bson
