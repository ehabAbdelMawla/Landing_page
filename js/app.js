/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const activeClass = `active`;
const navbarList = document.querySelector(`#navbar__list`);
const sections = document.querySelectorAll(`section`);
const domFragment = document.createDocumentFragment();
const upBtn = document.getElementById(`up_btn`);

let stopScollingCheck;   // will hold setTimeOut Function to can be clear easily
/**
 * End Global Variables
 * Start Helper Functions
 *
*/

const getCurrentActiveSection = () => {
    /**
     *  This Method return the current Active Section
     */
    return document.querySelector(`section.${activeClass}`)
}


const checkUpButtonVisibility = () => {
    /**
     * Check if user scroll down with more than viewport height to show arrow up button
     * and opposite 
     */
    if (window.scrollY > window.visualViewport.height) {
        upBtn.classList.add(`show`);
    }
    else {
        upBtn.classList.remove(`show`);
    }
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

// build the nav
const buildNavBar = () => {
    /**
     *  Loop on all sections in HTML Page and append in document fragment.
     *  document fragment use to 
     *  to avoid more than repaint and reflow
     */
    sections.forEach(section => {
        const li = document.createElement(`li`);
        li.classList.add(`menu__link`);
        section.classList.contains(activeClass) ? li.classList.add(activeClass) : null;
        li.setAttribute(`data-sectionId`, `${section.id}`)
        li.textContent = section.getAttribute(`data-nav`);
        domFragment.append(li);
    });

    /**
     * add Click Listener to navbarList `UL`
     * adding one event is more efficent of adding  event to each 'li' in 'ul'
     *  
     */

    navbarList.addEventListener(`click`, navItemClickListener);
    /**
     *  append document fragment to navbarList `Ul` 
     */

    navbarList.append(domFragment);
}


// Add class 'active' to section when near top of viewport

const getNearestSection = () => {
    /**
     * get current scroll position and determine which section is near to add active class on it 
     * and remove active class of the prev class
     */
    const scrollPosition = window.scrollY;
    let targetSection;
    sections.forEach(element => {
        if (element.offsetTop <= (scrollPosition + navbarList.offsetHeight + (element.offsetHeight / 2))) {
            targetSection = element;
        }
    });
    customeToggle(targetSection);
}



// Scroll to anchor ID using scrollTO event
const navItemClickListener = (event) => {
    // To Ignore click on ul 'parent'
    console.log(navbarList.offsetHeight)
    if (event.target.tagName === "LI") {
        const targetSection = document.getElementById(event.target.getAttribute(`data-sectionId`));
        window.scrollTo({
            top: (targetSection.offsetTop + (navbarList.offsetHeight / 2)), behavior: 'smooth'
        });
    }
}

/**
 * End Main Functions
 * Begin Events
 *
*/

// Build menu 
buildNavBar();

// Scroll to section on link click
window.addEventListener(`scroll`, getNearestSection);
window.addEventListener(`scroll`, checkUpButtonVisibility);

window.addEventListener(`scroll`, () => {
    navbarList.classList.remove(`hide`);
    // While Scrolling window will clear time out 
    window.clearTimeout(stopScollingCheck);

    // when scroll stoping the setTimeout is invoke without clearing 
    stopScollingCheck = setTimeout(() => {
        navbarList.classList.add(`hide`);
    }, 2000);

});


// Set sections as active
const customeToggle = (targetSection) => {
    /**
     * add active class to new section and new li 
     * retmove active class from Prev section and prev li 
     */
    const currentActive = getCurrentActiveSection();
    if (targetSection && currentActive && currentActive.id != targetSection.id) {
        // Remove active Class From Prev Section and list Item 
        currentActive.classList.remove(activeClass);
        document.querySelector(`ul li.${activeClass}`).classList.remove(activeClass);
        // Add Active Class To target Section and List Item
        targetSection.classList.add(activeClass);
        document.querySelector(`ul li[data-sectionid=${targetSection.id}]`).classList.add(activeClass);
    }
}

// up button Action 
upBtn.addEventListener(`click`, () => {
    window.scrollTo({
        top: 0,
        behavior: `smooth`,
    })
})