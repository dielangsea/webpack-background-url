export default (text ='hello dielang',class1,class2) => {
	const elem = document.createElement('div');
	elem.innerHTML = text;
	elem.className = class1;
	
	const p = document.createElement('p');
	p.innerHTML = 'p line text';
	p.className = class2;
	
	elem.appendChild(p);
	
	return elem;
}
