/* eslint-disable no-param-reassign */
import {
  CanvasTexture,
  ClampToEdgeWrapping,
  LinearFilter,
  Sprite,
  SpriteMaterial,
  Group,
} from 'three/build/three.module';

import { max } from 'd3-array/src/index';

function getLabel(
  message,
  {
    size = 50,
    type = 'helvetica',
    colour = 'rgba(0,0,0,0.7)',
    scale = 0.1,
    background = false,
    border = 0,
    padding = 0,
    bgColour = 'transparent',
  } = {}
) {
  border = background ? border : 0;
  padding = background ? padding : 0;
  bgColour = background ? bgColour : 0;

  // Font.
  const font = `${size}px ${type}`;

  // Canvas set up.
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  ctx.font = font;

  // Measure how long the message will and the background should be.
  const textWidth = ctx.measureText(message).width;
  const baseWidth = textWidth * (1 + padding);
  const baseHeight = size * (1 + padding);

  // Calculate the canvas dimensions.
  const doubleBorderSize = border * 2;
  const width = baseWidth + doubleBorderSize;
  const height = baseHeight + doubleBorderSize;
  canvas.width = width;
  canvas.height = height;

  // Need to set font again after resizing
  // the canvas and centre the text.
  ctx.font = font;
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';

  // Build background rect.
  if (background) {
    ctx.fillStyle = bgColour;
    ctx.fillRect(0, 0, width, height);
  }

  // Scale to fit but don't stretch and translate.
  const scaleFactor = Math.min(1, baseWidth / textWidth);
  ctx.translate(width / 2, height / 2);
  ctx.scale(scaleFactor, 1);

  // Write.
  ctx.fillStyle = colour;
  ctx.fillText(message, 0, 0);

  // Turn the canvas into a texture.
  const texture = new CanvasTexture(canvas);
  // because our canvas is likely not a power of 2 in both
  // dimensions (for mipmaps) set the filtering appropriately.
  texture.minFilter = LinearFilter;
  texture.wrapS = ClampToEdgeWrapping;
  texture.wrapT = ClampToEdgeWrapping;

  // Turn the texture into material
  const labelMaterial = new SpriteMaterial({
    map: texture,
    transparent: true,
  });

  // If units are meters then 0.01 here turns
  // the label size unit into centimeters.
  const label = new Sprite(labelMaterial);
  label.scale.x = canvas.width * scale;
  label.scale.y = canvas.height * scale;

  // Add the texture's width,
  // allows us to align it with other labels.
  label.userData.width = width;

  return label;
}

function getLabels(data, { size = 1, align = 'right' } = {}) {
  const rowLabels = [];
  const colLabels = [];
  for (let i = 0; i < data.length; i++) {
    const d = data[i];

    // Get row label positions.
    if (!rowLabels.map(el => el.row).includes(d.row))
      rowLabels.push({
        row: d.row,
        index: d.index[0],
        position: d.position[0],
      });

    // Get col label positions.
    if (!colLabels.map(el => el.col).includes(d.col))
      colLabels.push({
        col: d.col,
        index: d.index[1],
        position: d.position[1],
      });
  }

  // debugger;
  const labelParams = {
    size: 40,
    type: 'Arial',
    colour: '#555',
    scale: 0.1,
    background: false,
  };

  const labels = new Group();

  rowLabels.forEach(d => {
    const rowLabel = getLabel(d.row, labelParams);
    rowLabel.userData.yRow = d.position;
    // rowLabel.userData.indexRow = d.index;
    labels.add(rowLabel);
    // labelWidths.push(rowLabel.userData.width);
  });

  // const maxWidth = max(labelWidths);

  labels.children.forEach(label => {
    // const slack = ((maxWidth - label.userData.width) / 2) * labelParams.scale;
    // const hPosition = align === 'right' ? slack : align === 'left' ? -slack : 0;
    label.position.set(0, label.userData.yRow, 0);
    label.center.set(1, 0.5);
  });

  return labels;
}

export default getLabels;
