CookieMock
==========

A mock object simulating behaviour of document.cookie.

Useful for unit tests running on Jenkins via PhantomJS.

How to Use It
-------------

Install with Bower:

```
bower install CookieMock
```

You need a single file CookieMock.js. Include it with a script tag.

```
<script src="bower_components/CookieMock/src/CookieMock.js"></script>
```

Then you can do use it the same way you would use document.cookie:

```
var mock = new CookieMock();

var expires = new Date();
expires.setTime(expires.getTime() + 60000); // expires in 1 minute

// Let's create a new cookie
mock.cookie = "foo=bar; expires=" + expires.toUTCString() + "; path=/;";

// You can update the cookie
mock.cookie = "foo=UPDATED_BAR; expires=" + expires.toUTCString() + "; path=/;";

// Delete the cookie by setting expires to be in the past
expires.setTime(expires.getTime() - 120000);
mock.cookie = "foo=; expires=" + expires.toUTCString() + "; path=/;";
```

This can be very useful when you have objects which are saving data to cookies.

In your unit tests you can pass the CookieMock object via dependency injection as an adapter.

You can then use the mock the same way you would use document.cookie.

For Contributors
----------------

If you want to contribute, just clone the repository:

```
git clone https://github.com/RichardKnop/CookieMock.git
```

Create a new branch, do your changes and then make a pull request.

Make sure you write unit tests for any changes and make sure your changes don't break existing tests.

To run unit tests you need to install dependencies:

```
npm install
bower install
```

You can then run the tests in command line:

```
grunt test
```
