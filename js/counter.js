// Todo counter funciton
export function taskCounter(item, db) {
    item.value = db.length;
}