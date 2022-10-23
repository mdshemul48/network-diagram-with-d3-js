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
      .x((d) => d.y + 15)
      .y((d) => d.x + 12)
  );

const notes = svg
  .selectAll('g')
  .data(dataInfo)
  .enter()
  .append('g')
  .attr('transform', (d) => `translate(${d.y + 15},${d.x + 12})`);

notes.append('circle').attr('r', 6.5);
notes
  .append('text')
  .text((d) => d.data.name)
  .attr('x', function (d) {
    return d.children ? -13 : 13;
  })
  .attr('dy', '.35em')
  .attr('text-anchor', function (d) {
    return d.children ? 'end' : 'start';
  })
  .style('fill-opacity', 1)
  .attr('fill', '#fff');

// const circles = svg.append('g').selectAll('circle').data(dataInfo);

// circles
//   .enter()
//   .append('circle')
//   .attr('cx', function (d) {
//     return d.y + 10;
//   })
//   .attr('cy', function (d) {
//     return d.x + 12;
//   })
//   .attr('fill', 'red')
//   .attr('r', 10);

// const texts = svg
//   .append('g')
//   .selectAll('text')
//   .data(dataInfo)
//   .enter()
//   .append('text')
//   .attr('x', function (d) {
//     return d.y - 56;
//   })
//   .attr('y', function (d) {
//     return d.x + 4;
//   })
//   .text((d) => {
//     return d.data.name;
//   });
