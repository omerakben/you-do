const renderToDOM = (divId, content) => {
  const selectedDiv = document.querySelector(divId);
  if (selectedDiv) {
    selectedDiv.innerHTML = content;
  }
};

export default renderToDOM;
