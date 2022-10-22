const treeData = {
  name: 'root',
  email: 'mdshemul@something.com',
  children: [
    { name: 'child #1' },
    {
      name: 'child #2',
      children: [
        { name: 'grandchild #1' },
        { name: 'grandchild #2' },
        { name: 'grandchild #3' },
        { name: 'grandchild #4' },
      ],
    },
  ],
};

const tree = d3.hierarchy(treeData);

const treeStructure = d3.tree().size([900, 700]);
const treeInfo = treeStructure(tree);

const dataInfo = treeInfo.descendants();

const svg = d3.select('svg').attr('width', 1000).attr('height', 900);

const connections = svg
  .attr('fill', 'none')
  .attr('stroke', 'black')
  .selectAll('path')
  .data(treeInfo.links())
  .join('path')
  .attr(
    'd',
    d3
      .linkHorizontal()
      .x((d) => d.y + 10)
      .y((d) => d.x + 12)
  );

const circles = svg.append('g').selectAll('circle').data(dataInfo);

circles
  .enter()
  .append('circle')
  .attr('cx', function (d) {
    return d.y + 10;
  })
  .attr('cy', function (d) {
    return d.x + 12;
  })
  .attr('fill', 'red')
  .attr('r', 10);

const texts = svg
  .append('g')
  .selectAll('text')
  .data(dataInfo)
  .enter()
  .append('text')
  .attr('x', function (d) {
    return d.y + 25;
  })
  .attr('y', function (d) {
    return d.x + 15;
  })
  .text((d) => {
    return d.data.name;
  });
