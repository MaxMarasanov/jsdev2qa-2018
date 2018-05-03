var salaries = { 
	user1: 100,
	user2: 200,
	user3: 300,
	user4: 400,
	user5: 500
}; 

var salariesSum = 0;

function task1()
{
	for (var amount in salaries) 
	{ 
		salariesSum += salaries[amount]
	}
	
	//вывожу тебе объект, чтобы ты видел цифры
	console.log(salaries);
	
	//вывожу тебе сумму или ноль
	if (Object.keys(salaries).length != 0) console.log(salariesSum);
	else console.log(0);	
}