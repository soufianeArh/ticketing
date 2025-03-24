import Link from 'next/link';

export default ({prop}) =>{
      console.log(prop)
      const links = [
            !prop && {label:"Sign In", href:"/auth/signin"},
            !prop && {label:"Sign Up", href:"/auth/signup"},
            prop && {label:"Sell tickets", href:"/tickets/new"},
            prop && {label:"My Orders", href:"/orders"},
            prop && {label:"Sign Out", href:"/auth/signout"}
      ].filter(item => item)
      .map(({label,href})=>{
            return <li key={href}>
                  <Link href={href}>
                    {label}
                  </Link>
                  </li>
      })
      ;
      console.log(links)
      return <nav className="navbar navbar-light bg-light m-10">
            <Link className="navbar-brand" href="/">
                  GitTix
            </Link>
            <div className="d-flex justify-content-end">
                  <ul className=" nav d-flex align-items-center">
                       {links}
                  </ul>
            </div>
      </nav>
}