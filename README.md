## jobster

we create new react app using vite and set all initial setup like

- install all packages like
  redux react-router react-icons styled-components and more we need

- create assets folder contains
  main css file contains variables main classes reset defaults and so on

- set all initials like redux files and routes

and now we will create all components and pages from scratch

#### 1) Setup Pages Structure

- create Landing, Error, Register, Dashboard pages
- and create react router routes

# 2) create Landing page

landing page, simple page contains heading, paragraph, and image

```js
const Landing = () => {
  return (
    <Wrapper className='section-center'>
      <div className='section-container page'>
        <article>
          <h1>
            Find the perfect <span>job</span> for you
          </h1>
          <p>
            with our paltform{' '}
            <strong>
              "job<span>ster</span>"
            </strong>{' '}
            you can always Find the perfect job for you, consectetur adipisicing
            elit. Quaerat repellat corporis animi. Voluptatum non dolore tenetur
            hic, debitis, laudantium adipisci eligendi accusamus quidem natus
            eos.
          </p>

          <Link to='register' className='btn'>
            login / register
          </Link>
        </article>
        <img src={heroImg} alt='jobster image' className='img main-img' />
      </div>
    </Wrapper>
  )
}
```

# 3) create Error page

same landing page, simple page contains error message

```js
const Error = () => {
  return (
    <Wrapper className='section-center'>
      <section className='section-container'>
        <img src={errorImg} alt='error image' className='img error-image' />
        <h4 className='error-title'>ooh! .. Page Not Found</h4>

        <Link to='/' className='btn'>
          back to home
        </Link>
      </section>
    </Wrapper>
  )
}
```

# 4) create Register Page initials - setup

initial setup or structure like

- form and functions placeholder onChange onSubmit
- initial state for user info
- main content without any logic just text and image

```js
const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
}
// if you can use local state, use it - i prefer local state if it available
// but if you can not use local state, use redux for that sure

function Register() {
  const [values, setValues] = useState(initialState)

  // redux toolkit and useNavigate later

  const handleChange = (e) => {
    console.log(e.target)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    console.log(e.target)
  }
  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={onSubmit}>
        <h3>Login</h3>
        <div className='form-row'>
          <label htmlFor='name' className='form-label'>
            name
          </label>

          <input
            type='text'
            value={values.name}
            name='name'
            onChange={handleChange}
            className='form-input'
          />
        </div>

        <button type='submit' className='btn btn-block'>
          submit
        </button>
      </form>
    </Wrapper>
  )
}
```

# 5) create Logo Component

we will use it in many places

```js
const Logo = () => {
  return (
    <Wrapper className='section-center'>
      <Link to='/'>
        job<span>Ster</span>
      </Link>
    </Wrapper>
  )
}
```

# 5) create FormRow Component

we will use it in many places - this app have many inputs
and we need dynamic input can use it in man places,
like register page , dashboard

```js
const FormRow = ({ type, name, value, handleChange, labelText }) => {
  return (
    <div className='form-row'>
      <label htmlFor={type} className='form-label'>
        {name}
      </label>

      <input
        type={type}
        value={value}
        name={name}
        id={name}
        onChange={handleChange}
        className='form-input'
      />
    </div>
  )
}

export default FormRow
```

now we can use it and provide the values to create witch input we need

# 6) Toggle Member

set logic to toggle member form true to false and vice-versa
if isMember true set form login shape if false set form to register shape

in register page do this logic

```js
// before return
const toggleMember = () => {
  setUserValues((prev) => {
    return {
      ...prev,
      isMember: !prev.isMember,
    }
  })
}

/* after submit button */

;<p className='member-text'>
  {userValues.isMember ? 'Not a member yet ?' : 'Already a member ?'}

  <button type='button' onClick={toggleMember} className='member-btn'>
    {userValues.isMember ? 'Register' : 'Login'}
  </button>
</p>
```

and after that, finish register page logic like

- toggle between login form and register form

in this case display name input only if the member is false

```js
{
  userValues.isMember || (
    <FormRow
      type='text'
      name='name'
      value={userValues.name}
      handleChange={handleChange}
    />
  )
}
```

# 7) Handle Change,handleSubmit and Empty Values

```js
const handleChange = (e) => {
  setUserValues((prev) => {
    return {
      ...prev,
      [e.target.name]: e.target.value,
    }
  })
}

const handleSubmit = (e) => {
  e.preventDefault()
  const { name, email, password, isMember } = userValues
  /* if no email or password, and check only for name is isMember false not submit */
  if (!email || !password || (!isMember && !name)) {
    alert('please fill all the fields')
    return
  }
  console.log(userValues)
}
```

# 8) Redux Store and User Slice - Setup

in this step will create store.js and userSlice.js initials

```js
// userSlice.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  user: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
})

export default userSlice.reducer
```

```js
// store.js
import { configureStore, createAsyncThunk } from '@reduxjs/toolkit'
import userSlice from './reducers/userSlice'

const store = configureStore({
  reducer: {
    user: userSlice,
  },
})

export default store
```

as you see just initial setup

import store in main.jsx and provider from react-redux

```js
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
```

# 9) RegisterUser, LoginUser - Placeholders

now in userSlice create to function or actions registerUser, loginUser

```js
export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (user, thunkApi) => {
    console.log(user)
  }
)

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (user, thunkApi) => {
    console.log(user)
  }
)
```

in register.jsx import those actions registerUser, loginUser
and useSelector and useDispatch from react-redux

and add more logic to handleSubmit

```js
const dispatch = useDispatch()
const { isLoading, user } = useSelector((state) => state.user)

const handleSubmit = (e) => {
  e.preventDefault()
  const { name, email, password, isMember } = userValues
  if (!email || !password || (!isMember && !name)) {
    return
  }

  if (isMember) {
    dispatch(registerUser({ email, password }))
    return
  }
  if (!isMember) {
    dispatch(loginUser({ name, email, password }))
    return
  }
}
```

# 10) Custom Axios Instance

- create utils folder
  and create axios.js file inside this axios file create custom instance

```js
import axios from 'axios'

const customFetch = axios.create({
  baseURL: 'https://redux-toolkit-jobster-api-server.onrender.com/api/v1',
})

export default customFetch
```

# 11) Register User

userSlice.js
back to userSlice.js and update registerUser and finish extraReducer

```js
export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (user, thunkApi) => {
    const { rejectWithValue } = thunkApi
    try {
      const response = await customFetch.post('/auth/register', user)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response)
    }
  }
)

// register
builder
  .addCase(registerUser.pending, (state) => {
    state.isLoading = true
  })
  .addCase(registerUser.fulfilled, (state, action) => {
    state.isLoading = false
    state.user = action.payload.user
    toast.success(`hello, ${action.payload.user.name}`)
  })
  .addCase(registerUser.rejected, (state, action) => {
    state.isLoading = false
    toast.error(action.payload.data.msg)
  })
```

# 12) Login User

userSlice.js
same deal in userSlice .. update and finish loginUser

```js
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (user, thunkApi) => {
    const { rejectWithValue } = thunkApi
    try {
      const response = await customFetch.post('/auth/login', user)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data.msg)
    }
  }
)

// login
builder
  .addCase(loginUser.pending, (state) => {
    state.isLoading = true
  })
  .addCase(loginUser.fulfilled, (state, action) => {
    state.isLoading = false
    state.user = action.payload.user
    toast.success(`welcome back, ${action.payload.user.name}`)
  })
  .addCase(loginUser.rejected, (state, action) => {
    state.isLoading = false
    toast.error(action.payload.data.msg)
  })
```

#### 13) LocalStorage

- utils/localStorage.js

we will create 3 functions in this file localStorage.js

```js
/* when we register we have user info but if we refresh page, in this case our data will remove 
it mean no there user so we need save user info in localStorage
*/
/* 
invoke it when user register or login  specific in userSlice,
make it  in in builder.fulFiled for registerUser and loginUser
 
.addCase(loginUser.fulfilled, (state, action) => {
    state.isLoading = false
    state.user = action.payload.user
    addUserToLocalStorage(user);
    toast.success(`welcome back, ${action.payload.user.name}`)
  }
   same deal with registerUser.fulfilled
*/
export const addUserToLocalStorage = (user) => {
  localStorage.setItem('user', JSON.stringify(user))
}

/* if user logout remove user data from localStorage */
// invoke it when  user logout
export const removeUserFromLocalStorage = () => {
  localStorage.removeItem('user')
}

/* if user do not logout but close the app, and is he decide back to app 
get all data about this user from localStorage
*/
/* 
 invoke it when app loads, specific in userSlice make user value in initialState = getUserFromLocalStorage()
*/
export const getUserFromLocalStorage = () => {
  const result = localStorage.getItem('user')
  const user = result ? JSON.parse(result) : null
  return user
}
```

# 14) Programmatically Navigate To Dashboard

last step in Register.jsx is navigate to Dashboard page when user register or login

```js
useEffect(() => {
  if (user) {
    setTimeout(() => {
      navigate('/')
    }, 3000)
  }
}, [user, navigate])
```

# 14) Setup Dashboard Pages

create dashboard folder in this folder create this pages
Stats.jsx, Profile.jsx, AddJob.jsx, AllJobs.jsx, SharedLayout.jsx,
after then create index.jsx and import all those pages in index.jsx and export them

- create Dashboard Folder
- create Stats, Profile, AddJob, AllJobs, SharedLayout,
- create index.js and setup import/export

App.js

```js
import {
  AllJobs,
  Profile,
  SharedLayout,
  Stats,
  AddJob,
} from './pages/dashboard'
```

# 15) Navbar, fixed sidebar, dynamic sidebar

- in components folder create Navbar, FixedSidebar, DynamicSidebar and use theme where you want specific in dashboard SharedLayout.jsx page

- Navbar, FixedSidebar, DynamicSidebar Structure

```js
// Navbar
import { useState } from 'react'
import styled from 'styled-components'
import { FaBars, FaCircleUser } from 'react-icons/fa6'

const Navbar = ({ openSidebar }) => {
  const [showLogout, setShowLogout] = useState(false)
  return (
    <Wrapper>
      <div className='section-center'>
        <button className='bars-icon' onClick={openSidebar}>
          <FaBars />
        </button>
        <div className='nav-title'>
          <h5>dashboard</h5>
        </div>
        <button
          className='user-icon'
          onClick={() => setShowLogout(!showLogout)}
        >
          <FaCircleUser />
          <span>yasser</span>
        </button>
        <button
          className={`logout-btn ${showLogout && 'show'}`}
          onClick={() => console.log('logout')}
        >
          logout
        </button>
      </div>
    </Wrapper>
  )
}

// FixedSidebar

import Styled from 'styled-components'
import Logo from './Logo'
import { Link } from 'react-router-dom'

const SidebarFixed = () => {
  return (
    <Wrapper>
      <header>
        <Logo />
      </header>
      <ul className='aside-links'>
        <li className='link-item'>
          <Link to='/dashboard'>stats</Link>
        </li>
        <li className='link-item'>
          <Link to='profile'>profile</Link>
        </li>
      </ul>
    </Wrapper>
  )
}

// DynamicSidebar

import Styled from 'styled-components'
import { FaTimes } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const SidebarDynamic = ({ isSidebarOpen, closeSidebar }) => {
  return (
    <Wrapper className={`${!isSidebarOpen && 'hide'}`}>
      <div className='content section-center'>
        <header>
          <button onClick={closeSidebar}>
            <FaTimes />
          </button>
        </header>
        <ul className='aside-links'>
          <li className='link-item'>
            <Link to='/dashboard'>stats</Link>
          </li>
          <li className='link-item'>
            <Link to='profile'>profile</Link>
          </li>
        </ul>
      </div>
    </Wrapper>
  )
}
```

# 16) Logout User

in userSlice.js in reducer create LogoutUser action, and use it in Navbar.jsx component in logout button

```js
reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.isSidebarOpen = false;
      removeUserFromLocalStorage();
    },
  },

export const { logoutUser } = userSlice.actions;

```

# 17) Restrict Access

- ProtectedRoute.jsx

create Protected page this page will rap dashboard (ShareLayout) page
and check for user if no user back to register page but if there user return page children

ProtectedRoute.jsx

```js
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((store) => store.user)
  if (!user) {
    return <Navigate to='/landing' />
  }
  return children
}

export default ProtectedRoute
```

App.js

```js
<Route
  path='/'
  element={
    <ProtectedRoute>
      <SharedLayout />
    </ProtectedRoute>
  }
>
  nested route here
</Route>
```

# 18) setup sidebars links

in utils create sidebarLinks.js in this file create dynamic links, able to use it any where in FixedSidebar.jsx or DynamicSidebar.jsx

```js
import { TbWorldSearch } from 'react-icons/tb'
import { MdOutlineAddchart } from 'react-icons/md'
import { FaChartBar } from 'react-icons/fa'
import { FaRegAddressCard } from 'react-icons/fa6'

export const links = [
  {
    id: 1,
    text: 'stats',
    url: '/dashboard',
    icon: <FaChartBar />,
  },
  {
    id: 2,
    text: 'all jobs',
    url: 'all-jobs',
    icon: <TbWorldSearch />,
  },
  {
    id: 1,
    text: 'add job',
    url: 'add-job',
    icon: <MdOutlineAddchart />,
  },
  {
    id: 1,
    text: 'profile',
    url: 'profile',
    icon: <FaRegAddressCard />,
  },
]
```

ok, now use this link and map on them in sidebars

# 19) Dashboard Pages Structure

- SharedLayout

```js
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import { SidebarFixed, SidebarDynamic, Navbar } from '../../components'
import { useState } from 'react'

const SharedLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const openSidebar = () => {
    setIsSidebarOpen(true)
  }

  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }

  return (
    <Wrapper>
      <Navbar openSidebar={openSidebar} />
      <SidebarDynamic
        isSidebarOpen={isSidebarOpen}
        closeSidebar={closeSidebar}
      />
      <section className='dashboard-content'>
        <SidebarFixed isSidebarOpen={isSidebarOpen} />
        <Outlet />
      </section>
    </Wrapper>
  )
}
```

and now let's setup dashboard pages

# 19) Profile Page - Structure

```js
import styled from 'styled-components'
import { useState } from 'react'
import { FormRow } from '../../components'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

const Profile = () => {
  const { isLoading, user } = useSelector((state) => state.user)

  const dispatch = useDispatch()

  const [userData, setUserData] = useState({
    name: user?.name || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    location: user?.location || '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const { name, lastName, email, location } = userData
    if (!name || !lastName || !email || !location) {
      toast.error('Please Fill Out All Fields')
      return
    }
  }
  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setUserData((prev) => {
      return { ...prev, [name]: value }
    })
  }

  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <h3 className='form-title'>profile</h3>

        <div className='form-center'>
          <FormRow
            type='text'
            name='name'
            id='name'
            labelText='name'
            value={userData?.name}
            handleChange={handleChange}
          />
          <FormRow
            type='text'
            name='lastName'
            id='lastName'
            labelText='last name'
            value={userData?.lastName}
            handleChange={handleChange}
          />
          <FormRow
            type='email'
            name='email'
            id='email'
            labelText='email'
            value={userData?.email}
            handleChange={handleChange}
          />
          <FormRow
            type='text'
            name='location'
            id='location'
            labelText='location'
            value={userData?.location}
            handleChange={handleChange}
          />

          <button type='submit' className='btn btn-block' disabled={isLoading}>
            {isLoading ? 'please wait..' : ' save changes'}
          </button>
        </div>
      </form>
    </Wrapper>
  )
}
```

# 20) Update User - Complete

now let's update user data and finish profile page

- Update User
- using patch method to update data on server

- {
  email:'yasser@gmail.com',
  name:'yasser',
  lastName:'saiid',
  location:'egypt
  '
  }
- authorization header : 'Bearer token'
- sends back the user object with token

userSlice.js

```js
// update user action
export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.patch('/auth/updateUser', user, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      })
      return resp.data
    } catch (error) {
      if (error.response.status === 401) {
        dispatch(logoutUser())
      }
      return thunkAPI.rejectWithValue(error.response.data.msg)
    }
  }
)

// extra reducers
builder
  .addCase(updateUser.pending, (state) => {
    state.isLoading = true
  })
  .addCase(updateUser.fulfilled, (state, action) => {
    const { user } = action.payload
    state.isLoading = false
    state.user = user
    addUserToLocalStorage(user)
    toast.success(`User Updated`)
  })
  .addCase(updateUser.rejected, (state, action) => {
    state.isLoading = false
    toast.error(action.payload.data.msg)
  })
```

now use this action in profile page when you submit update form

```js
const handleSubmit = (e) => {
  e.preventDefault()
  const { name, lastName, email, location } = userData
  if (!name || !lastName || !email || !location) {
    toast.error('Please Fill Out All Fields')
    return
  }
  dispatch(updateUser(userData))
}
```

# 21) Add job Page and Job Slice

in this step we will work on AddJob.jsx page and jobSlice.js

- The AddJob.jsx page already exists in dashboard folder and we step the structure for this page

- in store file create file with name jobSlice.js

-- jobSlice structure

```js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import customFetch from '../../utils/axios'
import { getUserFromLocalStorage } from '../../utils/localStorage'

const initialState = {
  isLoading: false,
  position: '',
  company: '',
  jobLocation: '',
  jobType: 'full-time',
  jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
  status: 'pending',
  statusOptions: ['interview', 'declined', 'pending'],
  isEditing: false,
  editJobId: '',
}

const jobSlice = createSlice({
  name: 'job',
  initialState,
})

export default jobSlice.reducer
```

- create new component FormRowSelect

```js
import styled from 'styled-components'

const FormRowSelect = ({ labelText, name, value, handleChange, options }) => {
  return (
    <Wrapper className='form-row'>
      <label htmlFor={name} className='form-label'>
        {labelText || name}
      </label>
      <select
        name={name}
        id={name}
        value={value}
        onChange={handleChange}
        className='form-select'
      >
        {options.map((item, index) => {
          return (
            <option value={item} key={index}>
              {item}
            </option>
          )
        })}
      </select>
    </Wrapper>
  )
}

const Wrapper = styled.div``

export default FormRowSelect
```

update AddJob.jsx page

```js
import styled from 'styled-components'
import { FormRow, FormRowSelect } from '../../components'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

const AddJob = () => {
  const {
    isLoading,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    statusOptions,
    status,
    isEditing,
    editJobId,
  } = useSelector((state) => state.job)
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!position || !company || jobLocation) {
      toast.error('Please Fill Out All Fields')
      return
    }
  }

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    console.log(`${name} : ${value}`)
  }

  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <h3 className='form-title'>{isEditing ? 'edit job' : 'add job'}</h3>
        <div className='form-center'>
          <FormRow
            type='text'
            name='position'
            id='position'
            value={position}
            handleChange={handleChange}
          />
          <FormRow
            type='text'
            name='company'
            id='company'
            value={company}
            handleChange={handleChange}
          />
          <FormRow
            type='text'
            name='job-location'
            id='job-location'
            labelText='job location'
            value={jobLocation}
            handleChange={handleChange}
          />
          {/*select*/}
          <FormRowSelect
            name='status'
            id='status'
            value={status}
            options={statusOptions}
            handleChange={handleChange}
          />
          <FormRowSelect
            name='jobType'
            id='jobType'
            labelText='job type'
            value={jobType}
            options={jobTypeOptions}
            handleChange={handleChange}
          />

          {/* buttons */}
          <div className='btn-container'>
            <button
              type='button'
              className='btn btn-block clear'
              onClick={() => console.log('clear')}
            >
              clear
            </button>
            <button
              type='submit'
              className='btn btn-block'
              disabled={isLoading}
            >
              submit
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  )
}

export default AddJob
```

- handleJobChange in jobSlice.js

in jobSlice in reducers

```js
 reducers: {
    handelJobChange: (state, action) => {
      const { name, value } = action.payload
      state[name] = value
    },
  },



  export const { handelJobChange } = jobSlice.actions
```

and import this action in addJob page and dispatch him in handleChange

```js
const handleChange = (e) => {
  const name = e.target.name
  const value = e.target.value
  dispatch(handelJobChange({ name, value }))
}
```

- clear all inputs value when click on clear btn

```js
// reducers
clearValues: () => {
  return {
    ...initialState,
  }
},
  (
    // AddJob
    <button
      type='button'
      className='btn btn-block clear'
      onClick={() => dispatch(clearValues())}
    >
      clear
    </button>
  )
```

- create job request ... add job to server

```js
export const createJob = createAsyncThunk(
  'job/createJob',
  async (jobData, thunkApi) => {
    const { rejectWithValue, getState, dispatch } = thunkApi

    try {
      const response = await customFetch.post('/jobs', jobData, {
        headers: {
          authorization: `Bearer ${getState().user.user.token}`,
        },
      })
      dispatch(clearValues())
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

extraReducers: (builder) => {
  builder
    .addCase(createJob.pending, (state) => {
      state.isLoading = true
    })
    .addCase(createJob.fulfilled, (state) => {
      state.isLoading = false
      toast.success('job created')
    })
    .addCase(createJob.rejected, (state, action) => {
      console.log(action.payload)
      state.isLoading = false
      toast.error(action.payload.msg)
    })
}
```

- set job location == user location

in addJob.jsx handle and do this

```js
useEffect(() => {
  if (!isEditing) {
    dispatch(handelJobChange({ name: 'jobLocation', value: user.location }))
  }
}, [])
```

in jobSlice.js do this

```js
 clearValues: () => {
      return {
        ...initialState,
        jobLocation: getUserFromLocalStorage()?.location || '',
      }
    },
```

# 22) setup AllJobs page structure and AllJobs Slice

- AllJobSlice - in reducers folder in create new file with name allJobsSlice.js

and write this code and create thunk to get jobs

```js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import customFetch from '../../utils/axios'

const initialFiltersState = {
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
}

const initialState = {
  isLoading: false,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initialFiltersState,
}

export const getAllJobs = createAsyncThunk(
  'allJobs/getJobs',
  async (_, thunkApi) => {
    const { rejectWithValue, getState } = thunkApi
    let url = `/jobs`

    try {
      const response = await customFetch.get(url, {
        headers: {
          Authorization: `Bearer ${getState().user.user.token}`,
        },
      })
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data.msg)
    }
  }
)

const allJobsSlice = createSlice({
  name: 'allJobs',
  initialState,
})

export default allJobsSlice.reducer
```

- AllJobs Page Structure - this page contains SearchForm and JobsContainer

at first create those components in components folder

- SearchContainer.jsx
  have all search logic and inputs

```js
import Styled from 'styled-components'

const SearchContainer = () => {
  return (
    <Wrapper className='form'>
      <h3 className='form-title'>Search form</h3>
    </Wrapper>
  )
}
```

- JobsContainer.jsx
  have jobs list and pagination

```js
import Styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import Job from './Job'

const JobsContainer = () => {
  const { isLoading, jobs } = useSelector((state) => state.allJobs)
  const dispatch = useDispatch()

  if (isLoading) {
    return <div className='loading'></div>
  }

  if (jobs.length === 0) {
    return <NoJobsWrapper>Sorry, No jobs to display...</NoJobsWrapper>
  }

  return (
    <JobsWrapper>
      <h5>jobs info</h5>
      {jobs.map((job) => {
        return <Job key={job._id} {...job} />
      })}
    </JobsWrapper>
  )
}
```

- Job.jsx
  this job card have job info

```js
import Styled from 'styled-components'
import { FaLocationArrow, FaCalendarAlt, FaBriefcase } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Job = ({
  _id,
  position,
  company,
  jobLocation,
  status,
  jobType,
  createdAt,
}) => {
  return (
    <Wrapper>
      <header>
        <div className='main-icon'>{company.charAt(0)}</div>
        <div className='info'>
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className='content'>
        <p className='location'>
          <FaLocationArrow /> {jobLocation}
        </p>
        <p className='date'>
          <FaCalendarAlt />
          {createdAt}
        </p>
        <p className='type'>
          <FaBriefcase />
          {jobType}
        </p>
        <p className={status}>{status}</p>
      </div>
      <footer>
        <Link className='btn edit' to='/add-job'>
          edit
        </Link>
        <button
          type='button'
          className='btn delete'
          onClick={() => console.log('delete')}
        >
          delete
        </button>
      </footer>
    </Wrapper>
  )
}
```

now we finish our component and we will work on delete job and edit job
but before that let create to actions in allJobsSlice,
and import in jobsSlice
because we need when we delete job ,get all jobs again

allJobsSlice.js

```js
reducers: {
    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
}
export const {
  showLoading,
  hideLoading,
} = allJobsSlice.actions;

```

and now create deleteJob action in jobsSlice after addJob action
jobSlice.js

and use it in Job.jsx component

```js
export const deleteJob = createAsyncThunk(
  'job/deleteJob',
  async (jobId, thunkApi) => {
    thunkApi.dispatch(showLoading())
    try {
      const response = await customFetch.delete(`/jobs/${jobId}`, {
        headers: {
          authorization: `Bearer ${thunkApi.getState().user.user.token}`,
        },
      })
      thunkApi.dispatch(getAllJobs())
      return response.data
    } catch (error) {
      thunkApi.dispatch(hideLoading())
      return rejectWithValue(error.response.data)
    }
  }
)

// extraReducer
builder
  .addCase(deleteJob.fulfilled, (state, action) => {
    console.log(action)
    toast.success('job deleted')
  })
  .addCase(deleteJob.rejected, (state, action) => {
    console.log(action)
    toast.error(action.payload.msg)
  })
```

and now create editJob in jobsSlice after clearValues in reducer object
jobSlice.js

```js
editJob: (state, action) => {
  return { ...state, isEditing: true, ...action.payload }
}
```

in job.jsx component

```js
<Link
  className='btn edit'
  to='/add-job'
  onClick={() =>
    dispatch(
      editJob({
        editJobId: _id,
        position,
        company,
        jobLocation,
        jobType,
        status,
      })
    )
  }
>
  edit
</Link>
```

in AddJob.jsx page

```js
useEffect(() => {
  if (!isEditing) {
    dispatch(handelJobChange({ name: 'jobLocation', value: user.location }))
  }
}, [])
```

now complete jobSlice.js, EditJob Request

jobSlice.js

```js
export const editJob = createAsyncThunk(
  'job/editJob',
  async ({ jobId, job }, thunkApi) => {
    try {
      const response = await customFetch.patch(`/jobs/${jobId}`, job, {
        headers: {
          authorization: `Bearer ${thunkApi.getState().user.user.token}`,
        },
      })
      return response.data
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data)
    }
  }
)

// extra reducer
builder
  .addCase(editJob.pending, (state) => {
    state.isLoading = true
  })
  .addCase(editJob.fulfilled, (state) => {
    state.isLoading = false
    toast.success('job updating...')
  })
  .addCase(editJob.rejected, (state, action) => {
    state.isLoading = false
    toast.error(action.payload.msg)
  })
```

in AddJob.jsx page in handelSubmit

```js
if (isEditing) {
  dispatch(
    editJob({
      jobId: editJobId,
      job: { position, company, jobLocation, jobType, status },
    })
  )
  return
}
```

now as you can see we use this headers with every request

```js
{
  headers: {
    authorization: `Bearer ${thunkApi.getState().user.user.token}`,
  },
}
```

yes we repeat this and this bad bracts, so we will use deferent ways
1- create new file in utils call authHeader.js in this file create new function call authHeader and import it when you need

- create utils/authHeader.js

```js
const authHeader = (thunkApi) => {
  return {
    headers: {
      authorization: `Bearer ${thunkApi.getState().user.user.token}`,
    },
  }
}

export default authHeader
```

2- the second wat is using axios interceptors - in utils/axios.js

update file like that

```js
import axios from 'axios'
import { getUserFromLocalStorage } from './localStorage'

const customFetch = axios.create({
  baseURL: 'https://jobify-prod.herokuapp.com/api/v1/toolkit',
})

customFetch.interceptors.request.use(
  (config) => {
    const user = getUserFromLocalStorage()
    if (user) {
      config.headers['Authorization'] = `Bearer ${user.token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default customFetch
```

# 22) setup Stats page

now let's work on states.jsx page and job states

- first get jobs stats
  in allJobsSlice.js create new action or createAsyncThunk

allJobsSlice.js

```js
export const getJobsStates = createAsyncThunk(
  'allJobs/getJobsStates',
  async (_, thunkApi) => {
    try {
      const response = await customFetch.get(
        '/jobs/stats',
        authHeader(thunkApi)
      )
      return response.data
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data)
    }
  }
)
// extra reducer
builder
  .addCase(getJobsStates.pending, (state) => {
    state.isLoading = true
  })
  .addCase(getJobsStates.fulfilled, (state, action) => {
    state.isLoading = false
    console.log(action.payload)
    state.stats = action.payload.defaultStats
    state.monthlyApplications = action.payload.monthlyApplications
  })
  .addCase(getJobsStates.rejected, (state, action) => {
    state.isLoading = false
    console.log(action.payload)
    toast.error(action.payload.msg)
  })
```

now in states.jsx page

```js
useEffect(() => {
  dispatch(getJobsStates())
}, [])
```

- Stats Page structure

- create tow components in components folder
- components/StatsContainer.js
- components/ChartsContainer.js
- import/export in index.jsx file

- stats.jsx

```js
import styled from 'styled-components'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getJobsStates } from '../../store/reducers/allJobsSlice'
import { StatesContainer, ChartsContainer } from '../../components'

const Stats = () => {
  const { isLoading, monthlyApplications } = useSelector(
    (state) => state.allJobs
  )
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getJobsStates())
  }, [])

  if (isLoading) {
    return <div className='loading'></div>
  }

  return (
    <Wrapper>
      <StatesContainer />
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </Wrapper>
  )
}

const Wrapper = styled.section`
  padding: 2rem 1rem;
  height: calc(100vh - 5rem);
`

export default Stats
```

- StatesContainer.jsx

```js
import Styled from 'styled-components'
import { useSelector } from 'react-redux'
import StatesItem from './StatesItem'
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from 'react-icons/fa'

const StatesContainer = () => {
  const { stats } = useSelector((state) => state.allJobs)

  const defaultsStates = [
    {
      id: 1,
      title: 'pending applications',
      count: stats.pending || 0,
      icon: <FaSuitcaseRolling />,
      color: '#ffc107',
    },

    {
      id: 2,
      title: 'interviews scheduled',
      count: stats.interview || 0,
      icon: <FaCalendarCheck />,
      color: '#6c63ff',
    },

    {
      id: 3,
      title: 'jobs declined',
      count: stats.declined || 0,
      icon: <FaBug />,
      color: '#e74c3c',
    },
  ]

  return (
    <Wrapper>
      {defaultsStates.map((state) => (
        <StatesItem key={state.id} {...state} />
      ))}
    </Wrapper>
  )
}
```

- StatesItem.jsx

```js
const StatesItem = ({ title, count, icon, color }) => {
  return (
    <Wrapper color={color}>
      <header>
        <span>{count}</span>
        <span>{icon}</span>
      </header>
      <h4>{title}</h4>
    </Wrapper>
  )
}
```

- chartsContainer.jsx

```js
import { useState } from 'react'
import { useSelector } from 'react-redux'
import BarChart from './BarChart'
import AreaChart from './AreaChart'

const ChartsContainer = () => {
  const [barChart, setBarChart] = useState(true)
  const { monthlyApplications: data } = useSelector((state) => state.allJobs)
  return (
    <Wrapper>
      <h3>Monthly Applications</h3>
      <button type='button' onClick={() => setBarChart(!barChart)}>
        {barChart ? 'Bar Chart' : 'Area Chart'}
      </button>
      {barChart ? <AreaChart data={data} /> : <BarChart data={data} />}
    </Wrapper>
  )
}
```

- components/AreaChartComponent.jsx
- components/BarChartComponent.jsx
  before setup charts we need install recharts library

```sh
  npm install recharts
```

- AreaChartComponent.jsx

```js
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'

const AreaChartComponent = ({ data }) => {
  return (
    <ResponsiveContainer width='100%' height={300}>
      <AreaChart data={data} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='date' />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Area
          type='monotone'
          dataKey='count'
          stroke='#716afdd3'
          fill='#6c63ff'
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default AreaChartComponent
```

- BarChartComponent.jsx

```js
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const BarChartComponent = ({ data }) => {
  return (
    <ResponsiveContainer width='100%' height={300}>
      <BarChart data={data} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray='3 3 ' />
        <XAxis dataKey='date' />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey='count' fill='#6c63ff' barSize={75} />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default BarChartComponent
```

# 23) Search Container

no let finish AllJobs.jsx page - finish filter jobs

- SearchContainer.jsx

```js
import Styled from 'styled-components'
import FormRow from './FormRow'
import FormRowSelect from './FormRowSelect'
import { useDispatch, useSelector } from 'react-redux'
import {
  handelFilterChange,
  clearFilters,
} from '../store/reducers/allJobsSlice'
import { useState, useMemo } from 'react'

const SearchContainer = () => {
  const [localSearch, setLocalSearch] = useState('')
  const { isLoading, search, searchStatus, searchType, sort, sortOptions } =
    useSelector((state) => state.allJobs)
  const { jobTypeOptions, statusOptions } = useSelector((state) => state.job)
  const dispatch = useDispatch()

  const handleSearch = (e) => {
    const name = e.target.name
    const value = e.target.value
    dispatch(handelFilterChange({ name, value }))
  }
  const handleClearSearch = (e) => {
    e.preventDefault()
    setLocalSearch('')
    dispatch(clearFilters())
  }

  /* 
- to handle search and avoid filter jobs on server by every letter user type in search input, we using debounce and useMemo

- okey , lets try useTranstion hook, to control serach input

*/

  const debounce = () => {
    let timeOutId
    return (e) => {
      setLocalSearch(e.target.value)
      clearTimeout(timeOutId)
      timeOutId = setTimeout(() => {
        dispatch(
          handelFilterChange({ name: e.target.name, value: e.target.value })
        )
      }, 1000)
    }
  }

  const optimizationDebounce = useMemo(() => debounce(), [])

  return (
    <Wrapper className='form'>
      <h3 className='form-title'>Search form</h3>
      <div className='form-center'>
        <FormRow
          type='text'
          name='search'
          id='search'
          value={localSearch}
          handleChange={optimizationDebounce}
        />
        <FormRowSelect
          name='searchStatus'
          id='searchStatus'
          labelText='status'
          value={searchStatus}
          handleChange={handleSearch}
          options={['all', ...statusOptions]}
        />
        <FormRowSelect
          name='searchType'
          id='searchType'
          labelText='type'
          value={searchType}
          handleChange={handleSearch}
          options={['all', ...jobTypeOptions]}
        />
        <FormRowSelect
          name='sort'
          id='sort'
          value={sort}
          handleChange={handleSearch}
          options={sortOptions}
        />
        <button
          type='button'
          className='btn btn-block clear-filter'
          disabled={isLoading}
          onClick={handleClearSearch}
        >
          clear filters
        </button>
      </div>
    </Wrapper>
  )
}
```

# 24) Pagination Setup

AllJobs.jsx page - finish pagination

- server returns 10 jobs per page

- components/pagination.jsx

update jobs container JobsContainer.jsx

```js
const { isLoading, jobs, totalJobs, numOfPages, page } = useSelector(
    (state) => state.allJobs
  )

  <JobsWrapper>
      <h5>
        {totalJobs} job{jobs.length > 1 && 's'} found
      </h5>
      <div className='container'>
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />
        })}
      </div>
      {numOfPages > 1 && <Pagination />}
    </JobsWrapper>
```

- setup pagination.jsx component

```js
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
```

- update getAllJobs AsyncThunk action in allJobs.js

- Query String Params

allJobsSlice

```js
export const getAllJobs = createAsyncThunk(
  'allJobs/getJobs',
  async (_, thunkAPI) => {
    const { page, search, searchStatus, searchType, sort } =
      thunkAPI.getState().allJobs;

    let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`;
    if (search) {
      url = url + `&search=${search}`;
    }
    try {
      const resp = await customFetch.get(url);
      return resp.data;
    }
  }
)
```

and now in JobsContainer.jsx component update useEffect

```js
const {
  jobs,
  isLoading,
  page,
  totalJobs,
  numOfPages,
  search,
  searchStatus,
  searchType,
  sort,
} = useSelector((store) => store.allJobs)

useEffect(() => {
  dispatch(getAllJobs())
  // eslint-disable-next-line
}, [page, search, searchStatus, searchType, sort])
```

# 25) Some Refactor

- clear store in case user logout
  if user logout reset all values in store to initial values
  in allJobsSlice.js in reducer

```js
clearAllJobsState: () => initialState,
```

and in userSlice.js create new thunk action

```js
export const clearAllState = createAsyncThunk(
  'user/clearAllState',
  async (msg, thunkApi) => {
    try {
      thunkApi.dispatch(logoutUser())
      thunkApi.dispatch(clearAllJobsState())
      thunkApi.dispatch(clearFilters())
      thunkApi.dispatch(clearValues())
      return Promise.resolve()
    } catch (error) {
      return Promise.reject()
    }
  }
)

/* 
in above asyncThunk we reset all state values in our store

- logoutUser this in same slice userSlice.js

- clearAllJobsState from allJobsSlice.js

- clearFilters from allJobsSlice.js

- clearValues from jobSlice.js

*/

// extraReducer
builder.addCase(clearAllState.rejected, () => {
  toast.error('something went wrong')
})
```

now import clearAllState thunk action in Navbar.jsx component
and replace it with logoutUser action

```js
<button
  className={`logout-btn ${showLogout && 'show'}`}
  onClick={() => dispatch(clearAllState())}
>
  logout
</button>
```

<!-- i will add some refactor in style later -->
