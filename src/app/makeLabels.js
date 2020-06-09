/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
import {
  CanvasTexture,
  ClampToEdgeWrapping,
  LinearFilter,
  Sprite,
  SpriteMaterial,
  Group,
} from 'three/build/three.module';

/**
 * Produces a single label sprite. Note this
 * will always face the camera.
 * @param { String } message Text to show
 * @param { Object } options Configurations
 * @returns { Sprite Mesh } Sprite mesh.
 */
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

  return label;
}

function getLabels(data, { size = 1 } = {}) {
  const rowLabelData = [];
  const colLabelData = [];

  // Loop through the data.
  // We'll make row and column labels here.
  for (let i = 0; i < data.length; i++) {
    const d = data[i];

    // Get row label positions.
    if (!rowLabelData.map(el => el.row).includes(d.row))
      rowLabelData.push({
        row: d.row,
        index: d.index[1],
        position: d.position[1],
      });

    // Get col label positions.
    if (!colLabelData.map(el => el.col).includes(d.col))
      colLabelData.push({
        col: d.col,
        index: d.index[0],
        position: d.position[0],
      });
  }

  // Set the sprite parameters here.
  const labelParams = {
    size: 400,
    type: 'Arial',
    colour: '#333',
    scale: 0.01,
    background: false,
  };

  // Make a group of row labels.
  const rowLabels = new Group();

  rowLabelData.forEach(d => {
    const rowLabel = getLabel(d.row, labelParams);
    rowLabel.position.set(0, d.position, 0);
    rowLabel.center.set(1, 0.5);
    rowLabels.add(rowLabel);
  });

  // Make a group of column labels.
  const colLabels = new Group();

  colLabelData.forEach(d => {
    const colLabel = getLabel(d.col, labelParams);
    colLabel.position.set(d.position, 0, 0);
    colLabel.material.rotation = Math.PI / 2;
    colLabel.center.set(0, 0.5);
    colLabels.add(colLabel);
  });

  return { colLabels, rowLabels };
}

export default getLabels;
