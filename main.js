/**********************************************************/
/*data*/
/**********************************************************/
var projects = [
    {
        id: "shows",
        name: "Custom Shows",
        description: "Fun Friendly competitions of all kinds that help build connections with each other in fun, friendly ways",
        activities: [
            "Old classic cars and trucks",
            "Motorcycles",
            "Law enforcement vehicles",
            "Horses and Rodeos",
            "Different Art",
            "Scuba diving",
            "Auctioning"
        ],
        note: "VIP get to stay at a vacation home for a few weeks of their choosing (must pay and update every year)"
    },
    {
        id: "ranch",
        name: "Ranch Home",
        description: "A ranch that we call our home. It's a place where we can all come together to rest, learn, and grow together as one big family. This place is a great place to help build our skills that can give back to others.",
        activities: [
            "A ranch home with guest rooms, study area, nice kitchen, pizza oven made of stone, patio with hot tub, swimming, gym, camping, rv setup, shooting, and archery",
            "Animals and rescure recovery and therapy",
            "Safe for families, people with disabilities, and animal friendly",
            "A safe place for ministry and support groups (partnering up with Life Choices, CityKidz, support soldiers and our ministries)"
        ]
    },
    {
        id: "art",
        name: "Arts and Therapy",
        description: "Anything art related that can be used as therapy to help one another",
        activities: [
            "Art",
            "Painting",
            "Music",
            "Dance",
            "Horse back riding",
            "Animals"
        ]
    }
];

/**********************************************************/
/*init*/
/**********************************************************/
window.onload = function() {
    startFadeInElements();
    setupArrowClickActions();

    setupProjectTiles();
    setupProjectTilesClickActions();
};

var setupArrowClickActions = function() {
    var projectsArrow = document.getElementById("projectsArrow");
    var contactArrow = document.getElementById("contactArrow");

    projectsArrow.onclick = function() {
        scrollToProjects();
    };

    contactArrow.onclick = function() {
        scrollToContacts();
    };
};

/**********************************************************/
/*projects*/
/**********************************************************/
var aProjectIsCurrentlySelected = false;

var setupProjectTiles = function() {
    var projectsGrid = document.getElementById("projectsGrid");

    for(var p in projects) {
        projectsGrid.innerHTML += "<div class=\"projectImgContainer\" id=\""
            + projects[p].id
            + "\"><img src=\"images/"
            + projects[p].id
            + ".jpg\" class=\"projectImg\"></div>";
    }
};

var setupProjectTilesClickActions = function() {
    //actions on project tiles
    for(var p in projects) {
        var tile = document.getElementById(projects[p].id);

        tile.onclick = (function(p) {
            return function() { projectClicked(projects[p]); }
        })(p);
    }

    //actions on title
    var projectsTitle = document.getElementById("projectsTitle");
    projectsTitle.onclick = function() {
        projectsTitle.style.cursor = "default";

        if(aProjectIsCurrentlySelected) {
            projectClicked();
        }
    };
    projectsTitle.onmouseover = function() {
        if(aProjectIsCurrentlySelected) {
            projectsTitle.style.cursor = "pointer";
        }
        else {
            projectsTitle.style.cursor = "default";
        }
    };
};

var projectClicked = function(project) {
    var grid = document.getElementById("projectsGrid");
    var focus = document.getElementById("focusedProject");
    var focusedProjectGrid = document.getElementById("focusedProjectGrid");
    var name = document.getElementById("focusedProjectName");
    var description = document.getElementById("focusedProjectDescription");
    var activities = document.getElementById("focusedProjectActivities");
    var note = document.getElementById("focusedProjectNote");

    if(aProjectIsCurrentlySelected) {
        aProjectIsCurrentlySelected = false;

        focusedProjectGrid.removeChild(document.getElementById("clone"));

        focus.style.display = "none";
        grid.style.display = "block";
    }
    else {
        //summary of below:
        // - clone the tile that was clicked
        // - add all details

        aProjectIsCurrentlySelected = true;
        
        var copy = document.getElementById(project.id).cloneNode(true);
        copy.setAttribute("id", "clone");
        //reattach click event on clone since .cloneNode() removes them.. //this is messy
        copy.onclick = (function(project) {
            return function() { projectClicked(projects[project]); }
        })(project);
        focusedProjectGrid.insertBefore(copy, document.getElementById("focusedProjectInsert"));
        
        name.innerHTML = project.name;
        description.innerHTML = project.description;
        activities.innerHTML = "<ul>";
        for (var t in project.activities) {
            activities.innerHTML += "<li>"
                + project.activities[t]
                + "</li>";
        }
        activities.innerHTML += "</ul>";

        if (project.note) {
        	note.innerHTML = project.note
        } else {
            note.innerHTML = ""
        }

        grid.style.display = "none";
        focus.style.display = "block";
    }

    //need this timeout to let focusedProject div finish laying out, so that center is calculated correctly
    setTimeout(scrollToProjects, 150);
};

/**********************************************************/
/*scrolling*/
/**********************************************************/
var scrollToProjects = function() {
    var projects = document.getElementById("projects");

    if(projects.offsetHeight > window.innerHeight) {
        projects.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest",
        });
    }
    else {
        projects.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "center",
        });
    }
};

var scrollToContacts = function() {
    var contact = document.getElementById("contact");

    contact.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
    });
}

var scrollToAbout = function() {
    var about = document.getElementById("about");

    if(about.offsetHeight > window.innerHeight) {
        about.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest",
        });
    }
    else {
        about.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "center",
        });
    }
}

/**********************************************************/
/*animations*/
/**********************************************************/
var startFadeInElements = function () {
    setTimeout(fadeInTitle, 650);
    setTimeout(fadeInCross, 1500);
};

var fadeInTitle = function() {
    var title = document.getElementById("title");
    title.classList.add("fadeInTitle");
};

var fadeInCross = function() {
    var title = document.getElementById("cross");
    title.classList.add("fadeInTitle");
};

