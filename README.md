# 3D corrplot

## Tech design

1. Get the data in
2. Expand a grid based on the number of variables
3. Place each element at its spot
4. Define the elements
   - Color
   - Radius
   - Height

Scales :)

1. x scale
2. y scale
3. z scale

## Add setting for grid shape

Setting `gridshape` would have options related to conditions like:

- 'full': no condtion
- 'half': `if (row <= col) continue`
- 'halfAuto': `if (row < col) continue`
