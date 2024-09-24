const colorMap = {
  '🔴': 'red',
  '🔵': 'blue',
  '🟡': 'yellow',
  '🟣': 'purple',
  '🟢': 'green'
};

function colorMark(md) {
  const oldRender = md.renderer.rules.mark_open || function(tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options);
  };

  md.renderer.rules.mark_open = function(tokens, idx, options, env, self) {
    const token = tokens[idx];
    const nextToken = tokens[idx + 1];
    
    if (nextToken && nextToken.type === 'text' && nextToken.content[0] in colorMap) {
      const color = colorMap[nextToken.content[0]];
      nextToken.content = nextToken.content.slice(1); // Remove the emoji
      token.attrJoin('class', `highlighted ${color}`);
    } else {
      token.attrJoin('class', 'highlighted');
    }

    return oldRender(tokens, idx, options, env, self);
  };
}

hexo.extend.filter.register('markdown-it:renderer', function(md) {
  md.use(colorMark);
});