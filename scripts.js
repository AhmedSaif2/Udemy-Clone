const URL = "https://ahmedsaif2.github.io/Udemy-Clone/db.json";
let coursesData;

function fetchCourses() {
  let parent = document.querySelector(".swiper-wrapper");
  fetch(URL)
    .then((Response) => Response.json())
    .then((items) => {
      coursesData = items.courses;
      coursesData.forEach((item) => {
        parent.append(addCourse(item));
      });
    });
}

function addCourse(item) {
  let course = document.createElement("div");
  course.classList.add("course");
  course.classList.add("swiper-slide");
  course.classList.add("id-" + item.id);
  course.innerHTML = `
    <img src="${item.course_img}" alt="${item.category} Course" />
    <h2>${item.title}</h2>
    <span>${item.author}</span>
    <br />
    <span class="rating">${item.rating}</span>
    <i class="fa-solid fa-star"></i>
    <i class="fa-solid fa-star"></i>
    <i class="fa-solid fa-star"></i>
    <i class="fa-solid fa-star"></i>
    <i class="fa-regular fa-star"></i>
    <span>(${item.ratings_count})</span>
    <h2>${item.price}</h2>
    `;
  return course;
}

function onSearchClick(event) {
  event.preventDefault();
  let searchText = document.querySelector(".search-bar").value;
  let items = coursesData;
  items.forEach((item) => {
    let title = item.title,
      searchTextFound = false;
    for (i = 0; i < title.length - searchText.length + 1; i++) {
      let curWord = title.substr(i, searchText.length);
      if (curWord.toLowerCase() == searchText.toLowerCase()) {
        searchTextFound = true;
        break;
      }
    }
    let element = document.querySelector(".id-" + item.id);
    if (element && !searchTextFound) {
      element.remove();
    } else if (!element && searchTextFound) {
      let parent = document.querySelector(".swiper-wrapper");
      parent.append(addCourse(item));
    }
  });
}

function onTabClick(categoryName, button) {
  let items = coursesData;
  if (categoryName == "all") {
    items.forEach((item) => {
      let element = document.querySelector(".id-" + item.id);
      if (element) {
        element.remove();
      }
    });
    items.forEach((item) => {
      let parent = document.querySelector(".swiper-wrapper");
      parent.append(addCourse(item));
    });
  } else {
    items.forEach((item) => {
      let element = document.querySelector(".id-" + item.id);
      if (element && item.category != categoryName) {
        element.remove();
      } else if (!element && item.category == categoryName) {
        let parent = document.querySelector(".swiper-wrapper");
        parent.append(addCourse(item));
      }
    });
  }
}

fetchCourses();

var swiper = new Swiper(".courses-swipper", {
  slidesPerView: 1,
  spaceBetween: 20,
  breakpoints: {
    640: {
      slidesPerView: 2,
    },
    1000: {
      slidesPerView: 3,
    },
    1200: {
      slidesPerView: 4,
    },
    1400: {
      slidesPerView: 5,
    },
  },
  navigation: {
    nextEl: ".next-button",
    prevEl: ".prev-button",
  },
});

let searchButton = document.querySelector(".submit-button");
searchButton.addEventListener("click", onSearchClick);

let categoryTabs = document.querySelectorAll(".courses-categories");
for (i = 0; i < categoryTabs.length; i++) {
  let categoryName = categoryTabs[i].innerHTML.toLowerCase();
  categoryTabs[i].addEventListener(
    "click",
    onTabClick.bind(null, categoryName, categoryTabs[i]),
    false
  );
}
