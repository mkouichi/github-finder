function About(): JSX.Element {
  return (
    <>
      <h1 className='text-6xl mb-4'>Github Finder</h1>
      <p className='mb-4 text-2xl font-light'>
        A React app to search GitHub profiles and see profile details. This
        project is part of the
        <a
          href='https://www.udemy.com/course/react-front-to-back-2022/'
          target='_blank'
          rel='noreferrer'>
          {' '}
          React Front To Back
        </a>{' '}
        Udemy course by
        <strong>
          <a href='https://traversymedia.com' target='_blank' rel='noreferrer'>
            {' '}
            Brad Traversy
          </a>
        </strong>{' '}
        with some additions by me.
      </p>
      <p className='text-lg text-gray-400'>
        Version <span className='text-gray-400'>1.0.0</span>
      </p>
      <p className='text-lg text-gray-400'>
        Layout By:{' '}
        <a className='text-gray-400' href='https://twitter.com/hassibmoddasser'>
          Hassib Moddasser
        </a>
      </p>
    </>
  );
}

export default About;
