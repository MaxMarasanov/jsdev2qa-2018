var manufacturer = ["iphone", "samsung", "nokia"];
var iphoneModels = ["iPhone 6s", "iPhone 7", "iPhone 7 Plus", "iPhone 8", "iPhone 8 Plus", "iPhone X", "iPhone 5"];
var samsungModels = ["Samsung Galaxy S6", "Samsung Galaxy S8", "Samsung Galaxy S7", "Samsung Galaxy S9+"];
var nokiaModels = ["Nokia 3310", "Nokia Lumia 850", "Nokia X", "Nokia XL"];

//обнуляем значения моделей, чтобы при смене выбора они отображались корректно
function removeModels(selectbox) {
    if (selectbox.options.length > 0) {
        selectbox.innerHTML = "";
    }
}

function populateModels() {
    removeModels(document.getElementById("model"));

    //получем текущее значение дроп-дауна Manufacturer
    var manufacturerSelectedValue = document.getElementById("manufacturer").value;

    if (!!manufacturerSelectedValue && manufacturerSelectedValue !== "default") {
        //преобразуем новое значение дроп-дауна Manufacturer, чтобы указать на массив
        var modelArray = manufacturerSelectedValue + "Models";
        var finalArray = window[modelArray];


        //добавляем в модели дефолтное значение - пустое
        var modelValues = document.getElementById("model");
        var option = document.createElement("option");
        option.text = "Please select";
        option.value = "default";
        modelValues.add(option);

        //добавляем в модели нужные значения из массива
        for (var i = 0; i < finalArray.length; i++) {
            var option = document.createElement("option");
            option.text = finalArray[i];
            option.value = finalArray[i];
            modelValues.add(option);
        }
    }
}

function generateReport() {

	//обнуляем текст ошибки перед новой валидацией
    var errorMessage = document.getElementsByClassName("result")[0];
    errorMessage.innerHTML = "";
	
	//валидируем на наличие новых ошибок
	validateReport();
	
	//если ошибки нет, то строим репорт
	if (errorMessage.innerHTML === "") {
		
		var manufacturerSelectedValue = document.getElementById("manufacturer").value;
		var modelSelectedValue = document.getElementById("model").value;
		
		//перед созданием нового репорта дропаем предыдущий, если он существует
		if (!!document.getElementById('report')) {
			document.getElementById('report').remove();
		}

		//начинаем создавать новый репорт
		var table = document.createElement('table');
		table.setAttribute("id", "report");

		var row1 = table.insertRow(0);

		var cell1 = row1.insertCell(0);
		cell1.colSpan = 2;

		var cellText1 = document.createTextNode(manufacturerSelectedValue);
		cell1.appendChild(cellText1);

		//если выбрана конкретная модель, то создаем репорт только для нее
		if (modelSelectedValue !== "default") {
			
			populateReport(table, 1, modelSelectedValue);

		}

		//иначе выводим инфу по всем моделям указанного производителя
		else {
	
			var modelArray = manufacturerSelectedValue + "Models";
			var finalArray = window[modelArray];
			finalArray.sort();
			var rowNumber = 1;

			for (var i = 0; i < finalArray.length; i++) {
			
				populateReport(table, rowNumber, finalArray[i]);
				rowNumber++;

			}	
		}

		//всовываем репорт перед блоком с ошибками
		var div = document.getElementById('result');
		document.body.insertBefore(table, div);
	}

}

function validateReport() {
    var manufacturerSelectedValue = document.getElementById("manufacturer").value;

    //раз мы сделали попытку создать новый репорт, то тут же уничтожаем старый
    if (!!document.getElementById('report')) {
        document.getElementById('report').remove();
    }

    //если не выбран производитель, то выдаем ошибку, не делаем репорт
    if (document.getElementById("manufacturer").value === "default") {
        var errorMessage = document.getElementsByClassName("result")[0];
        errorMessage.innerHTML = "Please select a manufacturer!";
    }

    //если выбран производитель и он в списке существующих
    else if (manufacturer.indexOf(manufacturerSelectedValue) !== -1) {

        var manufacturerSelectedValue = document.getElementById("manufacturer").value;
        var modelSelectedValue = document.getElementById("model").value;

        //делаем попытку найти модель у заданного производителя
        if (modelSelectedValue !== "default") {
            var modelArray = manufacturerSelectedValue + "Models";
            var finalArray = window[modelArray];
            var modelFound = false;

            for (var i = 0; i < finalArray.length; i++) {

                //если модель нашли - перестаем искать
                if (finalArray[i] === modelSelectedValue) {
                    modelFound = true;
                    break;
                }
            }

            //если модель не нашли - выводим ошибку, не создаем репорт
            if (modelFound === false) {
                var errorMessage = document.getElementsByClassName("result")[0];
                errorMessage.innerHTML = "Specified model doesn't exist in the selected manufacturer!";
            }
        }

    }

    //если выбранный производитель вообще не существует - выводим ошибку, не создаем репорт
    else {
        var errorMessage = document.getElementsByClassName("result")[0];
        errorMessage.innerHTML = "No data found!";
    }

}


function populateReport(table, rowNumber, modelSelectedValue)
{
	var row2 = table.insertRow(1);

    var cell2 = row2.insertCell(0);
    var cell3 = row2.insertCell(1);

    var cellText2 = document.createTextNode(modelSelectedValue);
    cell2.appendChild(cellText2);

    var cellText3 = document.createElement('div');

    //если нечетное кол-во символов - статус доступен
    if (modelSelectedValue.length % 2 !== 0) {
		cellText3.className = 'available';
		cellText3.innerHTML = "Available";
    }

    //если четное кол-во символов - статус недоступен
    else {
        cellText3.className = 'na';
        cellText3.innerHTML = "Not Available";
        }

    cell3.appendChild(cellText3);

}