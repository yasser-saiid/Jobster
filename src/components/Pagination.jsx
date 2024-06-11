import Styled from 'styled-components'
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi'
import { useSelector, useDispatch } from 'react-redux'
import { changePage } from '../store/reducers/allJobsSlice'

const Pagination = () => {
  const { numOfPages, page } = useSelector((state) => state.allJobs)
  const dispatch = useDispatch()

  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1
  })

  const prevPage = () => {
    let newPage = page - 1
    if (newPage < 1) {
      newPage = 1
    }
    dispatch(changePage(newPage))
  }
  const nextPage = () => {
    let newPage = page + 1
    if (newPage > numOfPages) {
      newPage = numOfPages
    }
    dispatch(changePage(newPage))
  }

  return (
    <Wrapper>
      <button type='btn' className='btn' onClick={prevPage}>
        <HiChevronDoubleLeft />
      </button>
      <div className='page-btn-container'>
        {pages.map((pageNum) => {
          return (
            <button
              type='button'
              className={`${page === pageNum ? 'btn active' : 'btn'}`}
              key={pageNum}
              onClick={() => dispatch(changePage(pageNum))}
            >
              {pageNum}
            </button>
          )
        })}
      </div>
      <button type='btn' className='btn' onClick={nextPage}>
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  )
}

const Wrapper = Styled.div`
  margin-top:2rem;
  padding-top:2rem ;
  padding-bottom:3rem ;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: flex-end;

  .page-btn-container{
    background-color:var(--purple);
    border-radius:var(--border-radius);
    .active{
      background-color:var(--white);
      color:var(--purple);
    }
  }
`

export default Pagination
