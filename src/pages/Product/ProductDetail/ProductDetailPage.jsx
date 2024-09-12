import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css'; // 스타일 import
import { Navigation, Pagination } from 'swiper/modules';
import ProductTab from './ProductTab';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';

export default function ProductDetailPage() {
  //   const [images, setImages] = useState([]);
  const [fetchProduct, setFetchProduct] = useState(null);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const [error, setError] = useState(null); // 오류 상태 추가

  const productId = 3;
  const images = [
    '/images/1.png',
    '/images/2.png',
    '/images/3.png',
    // 추가 이미지 경로
  ];

  const [isLiked, setIsLiked] = useState(false); // 찜 상태 관리

  const toggleLike = () => {
    setIsLiked(!isLiked); // 찜 상태 토글
  };

  // 상세 정보 불러오기
  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/product/read?productId=${productId}`,
        );
        setFetchProduct(res.data);
        console.log('fetchProductDetail data ->', res.data);
      } catch (error) {
        setError(error.message); // 오류 메시지를 상태에 저장
      } finally {
        setLoading(false); // 로딩 상태 종료
      }
    };
    fetchProductDetail();
  }, [productId]);

  if (loading) return <div>로딩 중...</div>;

  // 오류가 발생했을 때
  if (error) return <div>오류 발생: {error}</div>;

  //   useEffect(() => {
  //     const fetchImages = async () => {
  //       try {
  //         const response = await fetch('https://your-api-url.com/images'); // 이미지 API URL
  //         const data = await response.json();
  //         setImages(data.images); // 응답 데이터에서 이미지 배열을 설정
  //       } catch (error) {
  //         console.error('이미지 불러오기 실패:', error);
  //       }
  //     };

  //     fetchImages();
  //   }, []);

  const reportUser = (data) => {
    try {
      const res = axios.post('http://localhost:8000/product/report', {
        userId: 2,
        productId: 3,
      });
      console.log(res.data);
    } catch (error) {}
  };

  return (
    <main>
      <div className="flex flex-col max-w-fulll">
        <div className="flex flex-col px-11 py-7 w-full bg-white ">
          <div className="">
            <div className="flex gap-5 max-md:flex-col">
              <section className="flex flex-col md:w-1/2 ">
                <div className="w-full aspect-square bg-zinc-100 ">
                  <Swiper
                    spaceBetween={50}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    modules={[Navigation, Pagination]} // modules 속성 추가
                  >
                    {images.map((image, index) => (
                      <SwiperSlide key={index}>
                        <img
                          src={image}
                          alt={`상품 이미지 ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </section>
              <div className="p-4 w-1/2">
                <h1 className="text-2xl md:text-4xl font-bold mb-2">
                  {fetchProduct.productName}
                </h1>
                <p className="text-lg font-semibold mb-2">
                  {fetchProduct.price} 원
                </p>
                <hr />
                <div className="flex justify-between mb-2">
                  <span className="text-gray-500">5일 전</span>
                  <button className="text-gray-500" onClick={reportUser}>
                    신고
                  </button>
                </div>
                <div className="flex gap-4 mt-4">
                  {' '}
                  {/* gap 추가 및 margin-top 설정 */}
                  <button
                    onClick={toggleLike}
                    className="text-red-500 hover:text-red-700 transition-all duration-300"
                  >
                    <FontAwesomeIcon
                      icon={isLiked ? solidHeart : regularHeart}
                      size="2x"
                    />
                  </button>
                  <button className="bg-[#FEE715] text-[#101820] w-32 px-4 py-2 rounded shadow hover:bg-yellow-600">
                    채팅
                  </button>
                  <button className="bg-[#f3b105] text-[#ffefbc] w-32 py-2 rounded shadow hover:bg-red-600">
                    안전구매
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ProductTab />
      </div>
    </main>
  );
}