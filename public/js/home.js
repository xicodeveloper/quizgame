const categoryButtons = document.querySelectorAll('.cat');

categoryButtons.forEach(button => {
  button.addEventListener('click', event => {
    const category = event.target.value;
    console.log(`You clicked on the ${category} category button`);
    window.location.href = `/test/${category}`;
  });
});
