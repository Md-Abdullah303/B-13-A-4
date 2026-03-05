<!-- Qns 1 -->
1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
getElementById:
This is a JavaScript method that is used to select a specific HTML element by its id. After selecting the element, you can modify or change it however you want.

getElementsByClassName:
This is a JavaScript method that is used to select HTML elements using their class name. After selecting those elements, you can perform different operations on them.

querySelector / querySelectorAll:
getElementById directly returns that specific element and getElementsByClassName returns an array-like collection that contains all elements with that class name. But querySelector returns the first matching node, and querySelectorAll returns a NodeList containing all matching elements.


<!-- qns 2 -->
2. How do you create and insert a new element into the DOM?
first create a element by createElement() that I want as like i want a div then i write: {const div = document.createElement("div")} it make a div in a variable,
2nd create innerText or innerHtml for this div,
3rd then appendChild this in to the container or that we want as like i want to append this is a body then i will write {body.appendChild(div)},

then it will append on body and we will show it..



<!-- qns 3 -->
3. What is Event Bubbling? And how does it work?
This is when an eventListener is added to a button or a specific place. When a click happens there, first the target element is found. Then by using that target element, its parentNode can be accessed, and if needed the parentNode of that parentNode can also be accessed and used.

Like, inside a div there are h1, p, and another div. Now if an eventListener is added inside the last div, then with event.target the clicked element can be found, and if needed its parentNode can also be accessed {event.target.parentNode} in this way.




<!-- qns 4 -->
4. What is Event Delegation in JavaScript? Why is it useful?
It is used so that multiple events do not have to be given.

In an easy way, there are many cards inside one container and inside the cards there are buttons. Instead of creating an event for every button, if the event is applied on the whole container then there is no need to write extra events separately. One event works for all card buttons.
like: (html code)
<ul id="list">
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ul>

(js code)

document.getElementById("list").addEventListener("click", function(event) {
  console.log(event.target.innerText);
});


What does this code say?

This code says run an event inside the id named list. Whenever you click anywhere inside the list, then event.target.innerText of that place will be console.log(). Like if you click on li-2, the console will be Item 2.





5. What is the difference between preventDefault() and stopPropagation() methods?


