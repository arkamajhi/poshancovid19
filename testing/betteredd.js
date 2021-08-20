class DropDown
{
  constructor(data)
  {
    this.data=data;
    this.targets = [];
  }

  filterData(filtersAsArray)
  {
    return this.data.filter(r => filtersAsArray.every((item,i) => item === r[i]));
  }

  getUniqueValues(dataAsArray,index)
  {
    const uniqueOptions = new Set();
    dataAsArray.forEach(r => uniqueOptions.add(r[index]));
    return [...uniqueOptions];
  }

  populateDropDown(el,listAsArray)
  {
    el.innerHTML="";

    listAsArray.forEach(item => {
      const option= document.createElement("option");
      option.textContent=item;
      el.appendChild(option);
    });
  }

  createPopulateDropDownFunction(el,elsDependsOn)
  {
    return () ==> {
      const elsDependsOnValues = elsDependsOn.map(depEl => depEl.value);
      const dataToUse = this.filterData(elsDependsOnValues);
      const listToUse = this.getUniqueValues(dataToUse,elsDependsOn.length);
      this.populateDropDown(el,listToUse);
    }
  }

  add(options)
  {
    //{target: "level3", dependsOn: ["level1","level2"]}
    const el = document.getElementById(options.target);
    const elsDependsOn = options.dependsOn.map(id => document.getElementById(id));
    const eventFunction = createPopulateDropDownFunction(el,elsDependsOn);
    const targetObject = { el: el, elsDependsOn: elsDependsOn, func: eventFunction};
  }

}
var myData=[
  ["Honda","Civic","a"],
  ["Honda","Civic","b"],
  ["Honda","Accord","c"],
  ["Honda","Accord","d"],
  ["Toyota","Corolla","a"],
  ["Toyota","Corolla","b"],
  ["Toyota","Camry","c"],
  ["Toyota","Camry","d"],
  ["Mercedes","C-Class","Basic"],
  ["Mercedes","C-Class","Hybrid"],
  ["Mercedes","S-Class","Basic"],
  ["Mercedes","S-Class","Hybrid"]
];

//var dd = new makeDropDown(myData);
//dd.add({target: "level3", dependsOn: ["level1","level2"]});
//dd.add({target: "level2", dependsOn: ["level1"]});
