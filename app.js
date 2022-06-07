const input = document.getElementById("input-field")
const addBtn = input.nextElementSibling
const toDosCollection = document.getElementById("toDosCollectionDiv")

let toDosArray = []

//LocalStorage actions
actionsLS = {
    renderToDos : () => {
        if (localStorage.getItem("toDosArray")) {
            toDosArray = localStorage.getItem("toDosArray")
            toDosArray = JSON.parse(toDosArray)
            toDosArray.forEach((toDo) => createToDo(toDo))
        } else {
            return
        }
    },

    saveToDo : inputValue => {
        toDosArray.push(inputValue)
        localStorage.setItem("toDosArray", JSON.stringify(toDosArray))
    },

    deleteToDo : inputValue => {
        toDosArray.splice(toDosArray.indexOf(inputValue), 1)
        localStorage.setItem("toDosArray", JSON.stringify(toDosArray))
    },

    editToDo : (inputValueOld, inputValueNew) => {
        const i = toDosArray.indexOf(inputValueOld)
        toDosArray[i] = inputValueNew
        localStorage.setItem("toDosArray", JSON.stringify(toDosArray))
    },

    saveTheme : (themeName) => {
        localStorage.setItem("theme", themeName)
    },

    renderSavedTheme : () => {
        const defaultColorTheme = "Dark"
        if (localStorage.getItem("theme")) {
            colorThemeBtn.innerText = localStorage.getItem("theme")

            switch (colorThemeBtn.innerText) {
                case "Dark":
                    colorTheme.setDarkTheme()
                    break;
                case "Light":
                    colorTheme.setLightTheme()
                    break;
            }

        } else {
            colorThemeBtn.innerText = defaultColorTheme
        }
    }
}

actionsLS.renderToDos()

addBtn.addEventListener("click", () => {
    if (input.value === "") {
        return alert("Can not add an empty task")
    }

    createToDo(input.value)
    actionsLS.saveToDo(input.value)
    input.value = ""
})

function createToDo(inputValue) {
    const newToDo = document.createElement("div")
    newToDo.classList = "to-do"

    const toDoText = document.createElement("input")
    toDoText.setAttribute("readonly", "readonly")
    toDoText.value = inputValue

    const editBtn = document.createElement("button")
    editBtn.innerText = "Edit"

    const deleteBtn = document.createElement("button")
    deleteBtn.innerText = "Delete"
    
    newToDo.append(toDoText)
    newToDo.append(editBtn)
    newToDo.append(deleteBtn)
    toDosCollection.append(newToDo)

    editBtn.addEventListener("click", () => {
        if (editBtn.innerText === "Edit") {
            editBtn.innerText = "Save"
            toDoText.removeAttribute("readonly")
            toDoText.focus()
            oldText = toDoText.value
        } else {
            actionsLS.editToDo(oldText, toDoText.value)
            editBtn.innerText = "Edit"
            toDoText.setAttribute("readonly", "readonly")
        }
    })

    deleteBtn.addEventListener("click", () => {
        actionsLS.deleteToDo(toDoText.value)
        deleteBtn.parentElement.remove()
    })
}

//Color theme
const bodyElement = document.querySelector("body")
const colorThemeBtn = document.getElementById("color-theme-btn")
colorThemeBtn.setAttribute("onclick", "changeColorTheme()")

const colorTheme = {
    setLightTheme : () => {
        colorThemeBtn.innerText = "Light"
        bodyElement.classList.remove("darkTheme")
        bodyElement.classList.add("lightTheme")
    },

    setDarkTheme : () => {
        colorThemeBtn.innerText = "Dark"
        bodyElement.classList.remove("lightTheme")
        bodyElement.classList.add("darkTheme")
    }
}

actionsLS.renderSavedTheme()

function changeColorTheme() {
    if (colorThemeBtn.innerText === "Dark") {
        colorTheme.setLightTheme()
    } else {
        colorTheme.setDarkTheme()
    }

    actionsLS.saveTheme(colorThemeBtn.innerText)
}
