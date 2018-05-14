var fruits = ["Яблоко", "Апельсин", "Слива", "Манго", "Ананас"]; 

function task3()
{
	console.log("Массив до: " + fruits);
	for (var i = 0; i < fruits.length; i++) 
	{ 
		if (fruits[i] === "Манго")
		fruits.splice(i, 1); //я использую splice, а не delete, чтобы не оставлять undefined значений
	} 
	console.log("Массив после: " + fruits);
}