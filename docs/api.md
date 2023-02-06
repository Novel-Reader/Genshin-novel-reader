<a name="LocalAPI"></a>

## LocalAPI
LocalAPI for get data from server

**Kind**: global class  

* [LocalAPI](#LocalAPI)
    * [.init(server,)](#LocalAPI+init) ⇒
    * [.checkNet()](#LocalAPI+checkNet) ⇒
    * [.login(email, password)](#LocalAPI+login) ⇒ <code>object</code>
    * [.getUsers()](#LocalAPI+getUsers) ⇒ <code>array</code>
    * [.getUserInfo(email)](#LocalAPI+getUserInfo) ⇒
    * [.addUser(email, name, password)](#LocalAPI+addUser) ⇒
    * [.deleteUser(email)](#LocalAPI+deleteUser) ⇒
    * [.updateUserPassword(password, user)](#LocalAPI+updateUserPassword) ⇒
    * [.updateUserAvatar(avatar, user)](#LocalAPI+updateUserAvatar) ⇒

<a name="LocalAPI+init"></a>

### localAPI.init(server,) ⇒
init api

**Kind**: instance method of [<code>LocalAPI</code>](#LocalAPI)  
**Returns**: API object  

| Param | Type | Description |
| --- | --- | --- |
| server, | <code>object</code> | username, password |

<a name="LocalAPI+checkNet"></a>

### localAPI.checkNet() ⇒
check internet is connect

**Kind**: instance method of [<code>LocalAPI</code>](#LocalAPI)  
**Returns**: pong  
<a name="LocalAPI+login"></a>

### localAPI.login(email, password) ⇒ <code>object</code>
user login

**Kind**: instance method of [<code>LocalAPI</code>](#LocalAPI)  
**Returns**: <code>object</code> - response  

| Param | Type |
| --- | --- |
| email | <code>string</code> | 
| password | <code>string</code> | 

<a name="LocalAPI+getUsers"></a>

### localAPI.getUsers() ⇒ <code>array</code>
get all users in dabatase

**Kind**: instance method of [<code>LocalAPI</code>](#LocalAPI)  
**Returns**: <code>array</code> - user list  
<a name="LocalAPI+getUserInfo"></a>

### localAPI.getUserInfo(email) ⇒
get user info by email

**Kind**: instance method of [<code>LocalAPI</code>](#LocalAPI)  
**Returns**: user object  

| Param | Type |
| --- | --- |
| email | <code>string</code> | 

<a name="LocalAPI+addUser"></a>

### localAPI.addUser(email, name, password) ⇒
add new user

**Kind**: instance method of [<code>LocalAPI</code>](#LocalAPI)  
**Returns**: boolean  

| Param | Type |
| --- | --- |
| email | <code>string</code> | 
| name | <code>string</code> | 
| password | <code>string</code> | 

<a name="LocalAPI+deleteUser"></a>

### localAPI.deleteUser(email) ⇒
delete user by email

**Kind**: instance method of [<code>LocalAPI</code>](#LocalAPI)  
**Returns**: boolean  

| Param | Type |
| --- | --- |
| email | <code>string</code> | 

<a name="LocalAPI+updateUserPassword"></a>

### localAPI.updateUserPassword(password, user) ⇒
change user password

**Kind**: instance method of [<code>LocalAPI</code>](#LocalAPI)  
**Returns**: user object  

| Param | Type | Description |
| --- | --- | --- |
| password | <code>string</code> |  |
| user | <code>string</code> | email |

<a name="LocalAPI+updateUserAvatar"></a>

### localAPI.updateUserAvatar(avatar, user) ⇒
change user avatar

**Kind**: instance method of [<code>LocalAPI</code>](#LocalAPI)  
**Returns**: user object  

| Param | Type | Description |
| --- | --- | --- |
| avatar | <code>string</code> | image path |
| user | <code>string</code> | email |

