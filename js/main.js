const images = [
  "birds-stamp.png"
]

let i = 0

function placeImage(x, y) {
  const nextSrc = "uploads/stamps/" + images[i]
  console.log(nextSrc)

  var scrollTop = window.pageYOffset
  const img = document.createElement("img")
  img.setAttribute("src", nextSrc)
  img.setAttribute("draggable", "false")
  img.classList.add("stamp")

  console.log(scrollTop)

  img.style.left = x + "px"
  img.style.top = (y - scrollTop) + "px"
  img.style.transform = "translate(-50%, -50%) scale(0.5) rotate(" + (Math.random() * 20 - 10) + "deg)"

  document.body.appendChild(img)

  i = i + 1
  if (i >= images.length) {
    i = 0
  }
}

document.addEventListener("click", function (event) {
  // event.preventDefault()
  placeImage(event.pageX, event.pageY)
})

document.addEventListener("touchend", function (event) {
  event.preventDefault()
  placeImage(event.pageX, event.pageY)
})
