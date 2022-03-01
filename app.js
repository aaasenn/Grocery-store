// SELECT ITEMS *************
const alert = document.querySelector('.alert')
const form = document.querySelector('.grocery-form')
const grocery = document.querySelector('#grocery')
const submitBtn = document.querySelector('.submit-btn')
const container = document.querySelector('.grocery-container')
const list = document.querySelector('.grocery-list')
const clearBtn = document.querySelector('.clear-btn')

// edit option

let editElement;
let editFlag = false;
let editID = "";

// EVENT LISTENERS
form.addEventListener('submit', addItem)
//clear items
clearBtn.addEventListener('click', clearItems)
//

//display alert
function addItem(e) {
    e.preventDefault()
    const value = grocery.value
    const id = new Date().getTime().toString()
    if(value && !editFlag){
        const element = document.createElement('article')
        element.classList.add('grocery-item')
        const attr = document.createAttribute('data-id')
        attr.value = id;
        element.setAttributeNode(attr)
        element.innerHTML = `<p class="title">${value}</p>
        <div class="btn-container">
          <!-- edit btn -->
          <button type="button" class="edit-btn">
            <i class="fas fa-edit"></i>
          </button>
          <!-- delete btn -->
          <button type="button" class="delete-btn">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      `;
    const deleteBtn = element.querySelector('.delete-btn')
    const editBtn = element.querySelector('.edit-btn')
    deleteBtn.addEventListener('click', deleteItem)
    editBtn.addEventListener('click', editItem)
      //apend child
      list.appendChild(element)
      displayAlert('item added to the list', 'success')
      container.classList.add('show-container')
      setBackToDefault()
      //add to local storage
      addToLocalStorage(id, value) 
    }
    else if(value && editFlag){
        editElement.innerHTML = value
        displayAlert('value changed', 'success')
        //edit local storage
        editLocalStorage(editID, value)
    }
    else {
        displayAlert('please enter value', 'danger')
    }
}

//display alert
function displayAlert(text, action) {
    alert.textContent = text
    alert.classList.add(`alert-${action}`)
//remove alert
    setTimeout(function(){
        alert.textContent = ""
        alert.classList.remove(`alert-${action}`)
    }, 1000)
}
//edit function
function editItem(e) {
    const element = e.currentTarget.parentElement.parentElement;
    //set edit item
    editElement = e.currentTarget.parentElement.previousElementSibling
    //set form value
    grocery.value = editElement.innerHTML;
    editFlag = true
    editID = element.dataset.id;
}
//delete function
function deleteItem(e) {
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id
    list.removeChild(element)
    if(list.children.length === 0) {
        container.classList.remove('show-container')
    }
    displayAlert('item removed', 'danger')
    setBackToDefault()
    //removeto local storage
    // removeFromLocalStorage(id)
}
//clear items
function clearItems(){
    const items = document.querySelectorAll('.grocery-item')

    if (items.length > 0) {
        items.forEach((elem) => {
            list.removeChild(elem)
        })
        container.classList.remove('show-container')
        displayAlert('empty list', 'danger')
        //localStorage.removeItem('list')
        setBackToDefault()
    }
}
//set back to defaults
function setBackToDefault() {
    grocery.value = ""
    editFlag = false
    editID = ""
    submitBtn.textContent = 'submit'
}
//LOCAL STORAGE
function addToLocalStorage(id, value) {
    console.log('add to local storage')
}
//edit local storage
function editLocalStorage(id, value) {
    
}



