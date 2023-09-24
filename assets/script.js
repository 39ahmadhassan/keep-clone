const addButton = document.querySelector('#add');
const updateLSData = () => {
    const textareaData = document.querySelectorAll('textarea');
    const notes = [];
    textareaData.forEach((note) =>{
        return notes.push(note.value);
    })
    localStorage.setItem('notes',JSON.stringify(notes));
}
const addNote = (text = '' ) => {
    const note = document.createElement('div');
    note.classList.add('col-md-3');
    const htmlData = `
    <div class="data-wrap">
    <div class="icon">
        <i class="edit fa-solid fa-pen-to-square"></i>
        <i class="del fa-solid fa-trash"></i>
    </div>
    <div class="data ${ text ? "" : "hidden" }"></div>
    <textarea class="${ text ? "hidden" : "" }"></textarea>
  </div>
    `;
    note.insertAdjacentHTML( 'afterbegin' , htmlData);
    const editbutton = note.querySelector('.edit');
    const delbutton = note.querySelector('.del');
    const maindiv = note.querySelector('.data');
    const textarea = note.querySelector('textarea');
    delbutton.addEventListener('click' , () =>{
        note.remove();
        updateLSData();
    })
    textarea.value = text;
    maindiv.innerHTML = text; 
    editbutton.addEventListener('click' , () =>{
        maindiv.classList.toggle('hidden');
        textarea.classList.toggle('hidden');
    })
    textarea.addEventListener('change' , (event) =>{
        const value = event.target.value;
        maindiv.innerHTML = value; 
        updateLSData();
    })
    document.querySelector('#data').appendChild(note);
}
const notes = JSON.parse(localStorage.getItem("notes"));
if(notes){
    notes.forEach((note) => addNote(note))
};
addButton.addEventListener( 'click' ,  ()  =>  addNote() );