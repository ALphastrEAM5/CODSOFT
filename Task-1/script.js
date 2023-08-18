const slide=  document.querySelector(".pic-slide");
firstImg = slide.querySelectorAll("img")[0];
arrowIcons = document.querySelectorAll(".wrapper i");

let isDragStart = false, prevPageX, prevScrollLeft;
let firstImgWidth = firstImg.clientWidth + 14;



arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        slide.scrollLeft +=  icon.id == "left" ? -firstImgWidth : firstImgWidth;
        
    });
});

const dragStart = (e) => {
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = slide.scrollLeft;
}

const dragging = (e) => {
    if (!isDragStart) return;
    e.preventDefault();
    slide.classList.add("dragging");
    let positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    slide.scrollLeft = prevScrollLeft - positionDiff;
    
}

const dragStop = () => {
    isDragStart = false;
    slide.classList.remove("dragging");
}

slide.addEventListener("mousedown", dragStart);
slide.addEventListener("touchstart", dragStart);

slide.addEventListener("mousemove", dragging);
slide.addEventListener("touchmove", dragging);

slide.addEventListener("mouseup", dragStop);
slide.addEventListener("mouseleave", dragStop);
slide.addEventListener("touchend", dragStop);

