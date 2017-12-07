const nameKeyStore = 'todo_task';
export const get = () => JSON.parse(localStorage.getItem(nameKeyStore)) || undefined;
export const set = (state, props) => {
    let toSave = {};
    props.forEach(p => toSave[p] = state[p]);
    localStorage.setItem(nameKeyStore, JSON.stringify(toSave));
};