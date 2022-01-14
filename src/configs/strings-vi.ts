const strings = {
  title: 'MangaUTE',
  common: {
    login: 'Đăng nhập',
    singup: 'Đăng kí',
    register: 'Đăng kí',
    home: 'Trang chủ',
    NA: 'Chưa có dữ liệu',
  },
  entities: {
    comic: {
      title: 'Truyện',
    },
    chapter: {
      title: 'Chương',
    },
    volume: {
      title: 'Volume',
    },
    comment: {
      requireAuth: 'Bạn phải đăng nhập để bình luận',
      inputPlaceholder: 'Thêm bình luận',
      emptyResult: 'Chưa có bình luận nào',
      mutations: {
        deleteSuccess: 'Đã xoá bình luận',
        updateSuccess: 'Đã cậP nhật bình luận',
      },
    },
    review: {
      title: 'Đánh giá truyện',
      content: 'Nội dung',
      mutations: {
        createSuccess: 'Đã thêm đánh giá',
        deleteSuccess: 'Đã xoá đánh giá',
        updateSuccess: 'Đã cập nhật đánh giá',
      },
    },
    favorite: {
      title: 'Yêu thích',
      requireAuth: 'Bạn phải đăng nhập để thêm truyện vào danh sách yêu thích',
      mutations: {
        loading: 'Đang tải',
        favorite: 'Thêm vào Yêu thích',
        unfavorite: 'Xoá khỏi Yêu thích',
      },
    },
  },
  sections: {
    landing: {
      title: 'Tận hưởng truyện theo cách của riêng mình',
      recommended: 'Gợi ý',
      lastedUpdate: 'Cập nhật mới nhất',
      recentlyAdded: 'Được thêm gần đây',
    },
    search: {
      title: 'Tìm kiếm',
      inputPlaceholder: 'Nhập để tìm kiếm',
      noResult: 'Không có kết quả',
      result: 'Kết quả tìm kiếm',
    },
    favorite: {
      title: 'Danh sách yêu thích',
      noResult: 'Không có truyện nào',
    },
    readHistory: {
      title: 'Lịch sử truyện đã đọc',
      noResult: 'Chưa đọc truyện nào',
    },
  },
  footer: {
    brand: 'Made with <3 by Ho Hoai San',
  },
  buttons: {
    viewMore: 'Xem thêm',
    delete: 'Xoá',
    update: 'Cập nhật',
    save: 'Lưu',
    signin: 'Đăng nhập',
    signup: 'Đăng kí',
    signout: 'Đăng xuất',
    editProfile: 'Chỉnh sửa',
    showDetail: 'Xem chi tiết',
    hideDetail: 'Ẩn chi tiết',
    showAllChapters: 'Hiển thị tất cả chương truyện',
    goBack: 'Trở lại',
    lastRead: 'Đọc gần nhất',
  },
  errors: {
    unknown: 'Lỗi không rõ nguyên nhân',
    network: 'Lỗi mạng',
    server: 'Lỗi máy chủ',
  },
  roles: {
    ADMIN: 'Quản trị viên',
    MOD: 'Biên tập viên',
    AUTHOR: 'Tác giả',
    USER: 'Người dùng',
  },
  forms: {
    labels: {
      email: 'Email',
      name: 'Tên',
      password: 'Mật khẩu',
      confirmPassword: 'Xác nhận mật khẩu',
      forgetPassword: 'Quên mật khẩu?',
    },
    validations: {
      emailValid: 'Phải là email hợp lệ',
      emailRequired: 'Phải điền email',
      nameValid: 'Tên phải ít nhất $number kí tự',
      nameRequired: 'Phải điền tên',
      passwordRequired: 'Phải nhập mật khẩu',
      confirmPasswordRequired: 'Phải nhập Xác nhận mật khẩu',
      passwordMustMatch: 'Xác nhận mật khẩu không khớp',
    },
  },
  pages: {
    signin: {
      greeting: 'Xin chào!',
      greeting2: 'Đăng nhập để lưu và giữ tiến độ đọc truyện của bạn!',
      noAccount: 'Chưa có tài khoản?',
    },
    signup: {
      greeting: 'Xin chào!',
      greeting2: 'Đăng kí để lưu và giữ tiến độ đọc truyện của bạn!',
      haveAccount: 'Đã có tài khoản?',
    },
    chapter: {
      nopage: 'Không có trang nào',
      chapterAlt: 'Chương $number',
      volumeAlt: 'Volume $number',
      pageAlt: 'Trang $number',
      prevChapter: '< Chương $number',
      back2Comic: 'Trở về truyện',
      nextChapter: 'Chương $number >',
    },
    comic: {
      views: 'Lượt xem',
      ratings: 'Đánh giá',
      favorites: 'Lượt yêu thích',
      authors: 'Tác giả',
      formats: 'Hình thức',
      genres: 'Thể loại',
      description: 'Mô tả',
      chapters: 'Chương truyện',
      noChap: 'Không có chương truyện nào',
    },
    favorite: {
      title: 'Dannh sách yêu thích của $user',
      listTitle: 'Dannh sách yêu thích',
    },
    notFound: {
      title: 'Opps',
      subtitle: 'Trang này không tồn tại',
    },
    profile: {
      author: {
        manageComic: 'Quản lí truyện',
        becomeAuthor: 'Đăng kí thành tác giả',
      },
    },
    readHistory: {
      title: 'Lịch sử truyện đã đọc',
      listTitle: 'Danh sách truyện',
    },
    listComic: {
      title: 'Danh sách truyện',
    },
  },
};

export default strings;
