const strings = {
  title: 'Managaku',
  common: {
    login: 'Login',
    singup: 'Sign up',
    register: 'Register',
    home: 'Home',
    NA: 'N/A',
  },
  entities: {
    comic: {
      title: 'Comic',
    },
    chapter: {
      title: 'Chapter',
    },
    volume: {
      title: 'Volume',
    },
    comment: {
      requireAuth: 'You must login to comment',
      inputPlaceholder: 'Leave a comment',
      emptyResult: 'No comment',
      mutations: {
        deleteSuccess: 'Deleted comment',
        updateSuccess: 'Updated comment',
      },
    },
    review: {
      title: 'Review comic',
      content: 'Content',
      mutations: {
        createSuccess: 'Review added',
        deleteSuccess: 'Deleted review',
        updateSuccess: 'Updated review',
      },
    },
    favorite: {
      title: 'Favorite',
      requireAuth: 'You need to login to add to favorite',
      mutations: {
        loading: 'Loading',
        favorite: 'Add to Favorite',
        unfavorite: 'Unfavorite',
      },
    },
  },
  sections: {
    landing: {
      title: 'Start rading your desired comic',
      recommended: 'Recommended',
      lastedUpdate: 'Latest Update',
      recentlyAdded: 'Recently Added',
    },
    search: {
      title: 'Search',
      inputPlaceholder: 'Type here to search',
      noResult: 'No result',
      result: 'Search result',
    },
    favorite: {
      title: 'Favorites',
      noResult: 'No favorite',
    },
    readHistory: {
      title: 'Read history',
      noResult: 'No history',
    },
  },
  footer: {
    brand: 'Made with <3 by Ho Hoai San',
  },
  buttons: {
    viewMore: 'View more',
    delete: 'Delete',
    update: 'Update',
    save: 'Save',
    signin: 'Sign in',
    signup: 'Sign up',
    showDetail: 'Show detail',
    hideDetail: 'Hide detail',
    showAllChapters: 'Show all chapters',
    goBack: 'Go back',
    lastRead: 'Last read',
    signout: 'Sign out',
    editProfile: 'Edit profile',
  },
  errors: {
    unknown: 'Unknow error',
    network: 'Network error',
    server: 'Server error',
  },
  roles: {
    ADMIN: 'Administrator',
    MOD: 'Moderator',
    AUTHOR: 'Author',
    USER: 'User',
  },
  forms: {
    labels: {
      email: 'Email',
      name: 'Name',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      forgetPassword: 'Forget Password?',
    },
    validations: {
      emailValid: 'Must be a valid email',
      emailRequired: 'Email is required',
      nameValid: 'Name must at least $number letters',
      nameRequired: 'Name is required',
      passwordRequired: 'Password is required',
      confirmPasswordRequired: 'Confirm password is required',
      passwordMustMatch: "Passwords don't match",
    },
  },
  pages: {
    signin: {
      greeting: 'Welcome',
      greeting2: 'Sign in to discover more culture!',
      noAccount: "I'm a new user",
    },
    signup: {
      greeting: 'Welcome',
      greeting2: 'Sign up to have better experience!',
      haveAccount: 'Already have an account?',
    },
    chapter: {
      nopage: 'No page',
      chapterAlt: 'Chapter $number',
      volumeAlt: 'Volume $number',
      pageAlt: 'Page $number',
      prevChapter: '< Chapter $number',
      back2Comic: 'Back to comic',
      nextChapter: 'Chapter $number >',
    },
    comic: {
      views: 'Views',
      ratings: 'Ratings',
      favorites: 'Favorites',
      authors: 'Authors',
      formats: 'Formats',
      genres: 'Genres',
      description: 'Description',
      chapters: 'Chapters',
      noChap: 'No chapter',
    },
    favorite: {
      title: "$user's favorites",
      listTitle: 'Favorite list',
    },
    notFound: {
      title: 'Opps',
      subtitle: 'This page was not found',
    },
    profile: {
      author: {
        manageComic: 'Manage your comics',
        becomeAuthor: 'Become an author',
      },
    },
    readHistory: {
      title: 'Your reading history',
      listTitle: 'Reading history list',
    },
    listComic: {
      title: 'Comic list',
    },
  },
};

export default strings;
