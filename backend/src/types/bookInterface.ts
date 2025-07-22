interface IBook {
  img: string,
  isbn: string,
  title: string,
  lastName: string,
  firstName: string,
  editorial: string,
  price: number,
  stock?: number
  latestBook: boolean
}

export { IBook }