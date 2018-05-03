var arrObjects = [];
 
arrObjects[0] = {
    id: 0,
    name: "Sergey"
};

arrObjects[1] = {
    id: 1,
    name: "Max",
	lastName: "Ivanov"
};

arrObjects[2] = {
    id: 2,
    name: "Vasya",
	lastName: "Pupkin",
	position: "Winner"
};

arrObjects[3] = {
    id: 3,
    name: "Lena",
};

arrObjects[4] = {
    id: 4,
};

//условие сортировки - по убыванию количества свойст
function compareLength(obj1, obj2) 
{
  return Object.keys(obj2).length - Object.keys(obj1).length
}

//вывожу уже отсортированный массив объектов
function task2()
{
	console.log(arrObjects.sort(compareLength));
}