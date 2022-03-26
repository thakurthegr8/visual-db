export const colorGenerator = (colorName: string) => {
    return {
      borderColor: colorName,
      color:colorName,
    }
  }
  export const colorGeneratorWithBg= (colorName: string) => {
    return {
      borderColor: colorName,
      color:colorName,
      backgroundColor:colorName
    }
  }