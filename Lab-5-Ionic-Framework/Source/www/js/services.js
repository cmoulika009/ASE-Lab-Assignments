angular.module('mychat.services', ['firebase'])
    .factory("Auth", ["$firebaseAuth", "$rootScope",
        function ($firebaseAuth, $rootScope) {
            var ref = new Firebase(firebaseUrl);
            return $firebaseAuth(ref);
        }])

    .factory('Chats', function ($firebase, Rooms) {

        var selectedRoomId;

        var ref = new Firebase(firebaseUrl);
        var chats;

        return {
            all: function () {
                return chats;
            },
            remove: function (chat) {
                chats.$remove(chat).then(function (ref) {
                    ref.key() === chat.$id; // true item has been removed
                });
            },
            get: function (chatId) {
                for (var i = 0; i < chats.length; i++) {
                    if (chats[i].id === parseInt(chatId)) {
                        return chats[i];
                    }
                }
                return null;
            },
            getSelectedRoomName: function () {
                var selectedRoom;
                if (selectedRoomId && selectedRoomId != null) {
                    selectedRoom = Rooms.get(selectedRoomId);
                    if (selectedRoom)
                        return selectedRoom.name;
                    else
                        return null;
                } else
                    return null;
            },
            selectRoom: function (roomId) {
                console.log("selecting the room with id: " + roomId);
                selectedRoomId = roomId;
                if (!isNaN(roomId)) {
                    chats = $firebase(ref.child('rooms').child(selectedRoomId).child('chats')).$asArray();
                }
            },
            send: function (from, message) {
                console.log("sending message from :" + from.displayName + " & message is " + message);
                if (from && message) {
                    var chatMessage = {
                        from: from.displayName,
                        message: message,
                        createdAt: Firebase.ServerValue.TIMESTAMP
                    };
                    chats.$add(chatMessage).then(function (data) {
                        console.log("message added");
                    });
                }
            }
        }
    })

    /**
     * Simple Service which returns Rooms collection as Array from Salesforce & binds to the Scope in Controller
     */
    .factory('Rooms', function ($firebase) {
        // Might use a resource here that returns a JSON array
        var ref = new Firebase(firebaseUrl);
        var rooms = $firebase(ref.child('rooms')).$asArray();

        return {
            all: function () {
                return rooms;
            },
            get: function (roomId) {
                // Simple index lookup
                return rooms.$getRecord(roomId);
            }
        }
    })

    .factory('EmployeeService', function ($q) {

        var employees = [
            {
                "id": 1,
                "firstName": "Anusha",
                "lastName": "Reddy",
                "managerId": 0,
                "managerName": "",
                "reports": 4,
                "title": "Available",
                "department": "Corporate",
                "cellPhone": "617-000-0001",
                "officePhone": "781-000-0001",
                "email": "malinenianusha@gmail.com",
                "city": "Boston, MA",
                "pic": "Amy_Jones.jpg",
                "twitterId": "@fakejking",
                "blog": "http://coenraets.org"
            },
            {
                "id": 2,
                "firstName": "Nikhita",
                "lastName": "Reddy",
                "managerId": 1,
                "managerName": "Anusha Reddy",
                "reports": 2,
                "title": "Available",
                "department": "Marketing",
                "cellPhone": "617-000-0002",
                "officePhone": "781-000-0002",
                "email": "nikky42222@gmail.com",
                "city": "Boston, MA",
                "pic": "Lisa_Wong.jpg",
                "twitterId": "@fakejtaylor",
                "blog": "http://coenraets.org"
            },
            {
                "id": 3,
                "firstName": "Sravani",
                "lastName": "Murakonda",
                "managerId": 1,
                "managerName": "Nikhita Reddy",
                "reports": 0,
                "title": "Available",
                "department": "Accounting",
                "cellPhone": "617-000-0003",
                "officePhone": "781-000-0003",
                "email": "elee@fakemail.com",
                "city": "Boston, MA",
                "pic": "Eugene_Lee.jpg",
                "twitterId": "@fakeelee",
                "blog": "http://coenraets.org"
            },
            {
                "id": 4,
                "firstName": "Ram",
                "lastName": "Kumar",
                "managerId": 1,
                "managerName": "Anusha Reddy",
                "reports": 3,
                "title": "Available",
                "department": "Engineering",
                "cellPhone": "617-000-0004",
                "officePhone": "781-000-0004",
                "email": "jwilliams@fakemail.com",
                "city": "Boston, MA",
                "pic": "John_Williams.jpg",
                "twitterId": "@fakejwilliams",
                "blog": "http://coenraets.org"
            },
            {
                "id": 5,
                "firstName": "Vamsi",
                "lastName": "Krishna",
                "managerId": 1,
                "managerName": "Anusha Reddy",
                "reports": 2,
                "title": "Not Available",
                "department": "Sales",
                "cellPhone": "617-000-0005",
                "officePhone": "781-000-0005",
                "email": "rmoore@fakemail.com",
                "city": "Boston, MA",
                "pic": "Ray_Moore.jpg",
                "twitterId": "@fakermoore",
                "blog": "http://coenraets.org"
            },
            {
                "id": 6,
                "firstName": "Balaram",
                "lastName": "Krishna",
                "managerId": 4,
                "managerName": "",
                "reports": 0,
                "title": "Available",
                "department": "Engineering",
                "cellPhone": "617-000-0006",
                "officePhone": "781-000-0006",
                "email": "pjones@fakemail.com",
                "city": "Boston, MA",
                "pic": "Paul_Jones.jpg",
                "twitterId": "@fakepjones",
                "blog": "http://coenraets.org"
            },
            {
                "id": 7,
                "firstName": "Druvanth",
                "lastName": "C",
                "managerId": 4,
                "managerName": "Nikhita Reddy",
                "reports": 0,
                "title": "Busy",
                "department": "Engineering",
                "cellPhone": "617-000-0007",
                "officePhone": "781-000-0007",
                "email": "pgates@fakemail.com",
                "city": "Boston, MA",
                "pic": "Paula_Gates.jpg",
                "twitterId": "@fakepgates",
                "blog": "http://coenraets.org"
            },
            {
                "id": 8,
                "firstName": "Moulika",
                "lastName": "Ch",
                "managerId": 2,
                "managerName": "Nikhita Reddy",
                "reports": 0,
                "title": "Available",
                "department": "Marketing",
                "cellPhone": "617-000-0008",
                "officePhone": "781-000-0008",
                "email": "lwong@fakemail.com",
                "city": "Boston, MA",
                "pic": "Lisa_Wong.jpg",
                "twitterId": "@fakelwong",
                "blog": "http://coenraets.org"
            },
            {
                "id": 9,
                "firstName": "Sri",
                "lastName": "Ram",
                "managerId": 2,
                "managerName": "Nikhita Reddy",
                "reports": 0,
                "title": "Not Available",
                "department": "Marketing",
                "cellPhone": "617-000-0009",
                "officePhone": "781-000-0009",
                "email": "gdonovan@fakemail.com",
                "city": "Boston, MA",
                "pic": "Gary_Donovan.jpg",
                "twitterId": "@fakegdonovan",
                "blog": "http://coenraets.org"
            },
            {
                "id": 10,
                "firstName": "Sri",
                "lastName": "Krish",
                "managerId": 0,
                "managerName": "",
                "reports": 0,
                "title": "Available",
                "department": "Sales",
                "cellPhone": "617-000-0010",
                "officePhone": "781-000-0010",
                "email": "kbyrne@fakemail.com",
                "city": "Boston, MA",
                "pic": "Kathleen_Byrne.jpg",
                "twitterId": "@fakekbyrne",
                "blog": "http://coenraets.org"
            },
            {
                "id": 11,
                "firstName": "Ron",
                "lastName": "Cla",
                "managerId": 0,
                "managerName": "",
                "reports": 0,
                "title": "Busy",
                "department": "Sales",
                "cellPhone": "617-000-0011",
                "officePhone": "781-000-0011",
                "email": "ajones@fakemail.com",
                "city": "Boston, MA",
                "pic": "Amy_Jones.jpg",
                "twitterId": "@fakeajones",
                "blog": "http://coenraets.org"
            },
            {
                "id": 12,
                "firstName": "Hemalatha",
                "lastName": "Konda",
                "managerId": 0,
                "managerName": "",
                "reports": 0,
                "title": "Not Available",
                "department": "Engineering",
                "cellPhone": "617-000-0012",
                "officePhone": "781-000-0012",
                "email": "swells@fakemail.com",
                "city": "Boston, MA",
                "pic": "Steven_Wells.jpg",
                "twitterId": "@fakeswells",
                "blog": "http://coenraets.org"
            }
        ];

        // We use promises to make this api asynchronous. This is clearly not necessary when using in-memory data
        // but it makes this service more flexible and plug-and-play. For example, you can now easily replace this
        // service with a JSON service that gets its data from a remote server without having to changes anything
        // in the modules invoking the data service since the api is already async.

        return {
            findAll: function () {
                var deferred = $q.defer();
                deferred.resolve(employees);
                return deferred.promise;
            },

            findById: function (employeeId) {
                var deferred = $q.defer();
                var employee = employees[employeeId - 1];
                deferred.resolve(employee);
                return deferred.promise;
            },

            findByName: function (searchKey) {
                var deferred = $q.defer();
                var results = employees.filter(function (element) {
                    var fullName = element.firstName + " " + element.lastName;
                    return fullName.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
                });
                deferred.resolve(results);
                return deferred.promise;
            },

            findByManager: function (managerId) {
                var deferred = $q.defer(),
                    results = employees.filter(function (element) {
                        return parseInt(managerId) === element.managerId;
                    });
                deferred.resolve(results);
                return deferred.promise;
            }

        }

    });