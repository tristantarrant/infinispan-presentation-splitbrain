var HashRing = function(id) {
	this.width = 960;
	this.height = 500;
	this.outerRadius = Math.min(this.width, this.height) * .5 - 10;
	this.innerRadius = this.outerRadius * .6;
	this.entryRadius = this.innerRadius * .1;

	this.numOwners = 2;
	this.numSegments = 60;
	this.segmentSize = 35791395; //Math.ceil((1 << 31) / this.numSegments);
	this.nodes = [1, 1, 1];
	this.entries = new Object();
	this.color = d3.scale.category20();
	this.arc = d3.svg.arc();

	this.pie = d3.layout.pie().sort(null);

	this.svg = d3.select(id).append("svg")
		.attr("width", this.width)
		.attr("height", this.height);

	this.svg.selectAll(".arc")
		.data(this.computeArcs())
	  .enter().append("g")
		.attr("class", "arc")
		.attr("transform", "translate(" + this.width / 2 + "," + this.height / 2 + ")")
	  .append("path")
		.attr("fill", function(d, i) { return this.color(i); }.bind(this))
		.attr("d", this.arc);
}

HashRing.prototype.mapSegments = function(nodes) {
	var owners = [];
	for(var i=0; i < this.numSegments; i++) {
		
	}
	return owners;
}

HashRing.prototype.addEntry = function(value) {
	var circle = this.svg.append("circle");
	circle.append("text").text(value);
	circle.attr("cx", this.width/2).attr("cy", this.height/2).attr("r", this.entryRadius ).attr("fill", this.color(Math.random(1000)));
	this.entries[value] = circle;
	
	//	alert("Segment for "+value+" is "+this.hashSegment(value));
}

HashRing.prototype.hashSegment = function(value) {
	var hash = murmurHash3.x86.hash32(value, 9001);
	hash = hash & 0x7fffffff;
	return Math.floor(hash / this.segmentSize);
}

HashRing.prototype.computeArcs = function() {
  var arcs = this.pie(this.nodes);
  for(var i=0; i < this.nodes.length; i++) {
    var arc = arcs[i];
    arc.innerRadius = this.innerRadius;
    arc.outerRadius = this.outerRadius;
  }
  return arcs;
}

HashRing.prototype.transition = function() {
	
}

