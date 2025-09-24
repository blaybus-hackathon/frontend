import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/ui/custom/Navbar';
import { Button } from '@/components/ui/custom/Button';
// import useProfileStore from '@/store/useProfileStore';
import {
  Phone,
  Search,
  UserCheck,
  Building2,
  CheckCircle,
  ChevronRight,
  Shield,
  Clock,
  MapPin,
  Heart,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/custom/card';

export default function Home() {
  const navigate = useNavigate();
  const blockAlert = () => {
    alert('준비 중입니다.');
  };

  return (
    <>
      <Navbar />
      <section className='py-16 lg:py-24 bg-gradient-to-br from-[var(--main)]/5 to-purple-50'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center space-y-8 max-w-4xl mx-auto'>
            <div className='space-y-6'>
              <div className='w-fit mx-auto text-base px-5 py-2 bg-[var(--main)]/10 text-[var(--main)] rounded-full font-semibold sm:text-sm lg:text-lg'>
                ⭐ 신뢰할 수 있는 돌봄 서비스
              </div>
              <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight'>
                <span className='text-[var(--main)]'>요양보호사</span>와
                <br />
                <span className='text-[var(--main)]'>노인복지센터</span>를
                <br />
                쉽고 빠르게 연결합니다
              </h1>
              <p className='text-sm lg:text-lg font-medium text-gray-600 leading-relaxed max-w-3xl mx-auto'>
                우리 가족을 위한 최고의 돌봄 서비스를 찾아보세요.
                <br />
                검증된 전문가들과 안전하게 매칭됩니다.
              </p>
            </div>

            <div className='flex flex-col sm:flex-row gap-3 justify-center items-center lg:w-[55%] mx-auto'>
              <Button
                className='text-xl hover:bg-white hover:text-[var(--main)] hover:border-[var(--main)]'
                onClick={blockAlert}
              >
                <Search className='w-5 h-5 mr-3' />
                돌봄 서비스 찾기
              </Button>
              <Button variant='white' className='text-xl' onClick={blockAlert}>
                <Phone className='w-5 h-5 mr-3' />
                전화 상담하기
              </Button>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 text-center'>
              <div className='space-y-2'>
                <div className='text-3xl font-bold text-[#522e9a]'>10,000+</div>
                <p className='text-gray-600 text-lg'>검증된 요양보호사</p>
              </div>
              <div className='space-y-2'>
                <div className='text-3xl font-bold text-[#522e9a]'>500+</div>
                <p className='text-gray-600 text-lg'>파트너 복지센터</p>
              </div>
              <div className='space-y-2'>
                <div className='text-3xl font-bold text-[#522e9a]'>99%</div>
                <p className='text-gray-600 text-lg'>고객 만족도</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Introduction */}
      <section id='service' className='py-20 bg-white'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center space-y-4 mb-16'>
            <h2 className='text-3xl sm:text-4xl font-bold text-gray-900'>돌봄워크 서비스</h2>
            <p className='text-xl text-gray-600 max-w-2xl mx-auto'>
              가족같은 마음으로 최고의 돌봄 서비스를 제공합니다.
            </p>
          </div>

          <div className='grid md:grid-cols-2 gap-12 max-w-6xl mx-auto'>
            <Card className='border-2 border-[var(--main)]/20 shadow-lg hover:shadow-xl transition-shadow'>
              <CardHeader className='text-center pb-8'>
                <div className='w-16 h-16 bg-[var(--main)]/10 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <UserCheck className='w-8 h-8 text-[var(--main)]' />
                </div>
                <CardTitle className='text-2xl text-[var(--main)]'>요양보호사 찾기</CardTitle>
                <CardDescription className='text-lg text-gray-600'>
                  검증된 전문 요양보호사를 빠르게 매칭
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4 text-lg'>
                <div className='flex items-start space-x-3'>
                  <CheckCircle className='w-6 h-6 text-green-500 mt-1 flex-shrink-0' />
                  <span>자격증 보유 전문가만 등록</span>
                </div>
                <div className='flex items-start space-x-3'>
                  <CheckCircle className='w-6 h-6 text-green-500 mt-1 flex-shrink-0' />
                  <span>경력 및 후기 투명 공개</span>
                </div>
                <div className='flex items-start space-x-3'>
                  <CheckCircle className='w-6 h-6 text-green-500 mt-1 flex-shrink-0' />
                  <span>24시간 응급 상황 대응</span>
                </div>
                <div className='flex items-start space-x-3'>
                  <CheckCircle className='w-6 h-6 text-green-500 mt-1 flex-shrink-0' />
                  <span>합리적인 비용, 투명한 요금제</span>
                </div>
                <Button className='w-full mt-6 text-lg py-6' onClick={blockAlert}>
                  요양보호사 찾기
                  <ChevronRight className='ml-2 w-5 h-5' />
                </Button>
              </CardContent>
            </Card>

            <Card className='border-2 border-[#522e9a]/20 shadow-lg hover:shadow-xl transition-shadow'>
              <CardHeader className='text-center pb-8'>
                <div className='w-16 h-16 bg-[#522e9a]/10 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <Building2 className='w-8 h-8 text-[#522e9a]' />
                </div>
                <CardTitle className='text-2xl text-[#522e9a]'>노인복지센터 찾기</CardTitle>
                <CardDescription className='text-lg text-gray-600'>
                  우리 지역 최고의 복지센터를 추천
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4 text-lg'>
                <div className='flex items-start space-x-3'>
                  <CheckCircle className='w-6 h-6 text-green-500 mt-1 flex-shrink-0' />
                  <span>정부 인증 복지센터만 선별</span>
                </div>
                <div className='flex items-start space-x-3'>
                  <CheckCircle className='w-6 h-6 text-green-500 mt-1 flex-shrink-0' />
                  <span>프로그램 및 시설 상세 정보</span>
                </div>
                <div className='flex items-start space-x-3'>
                  <CheckCircle className='w-6 h-6 text-green-500 mt-1 flex-shrink-0' />
                  <span>거리별, 서비스별 맞춤 검색</span>
                </div>
                <div className='flex items-start space-x-3'>
                  <CheckCircle className='w-6 h-6 text-green-500 mt-1 flex-shrink-0' />
                  <span>실제 이용자 리뷰 제공</span>
                </div>
                <Button className='w-full mt-6 text-lg py-6' onClick={blockAlert}>
                  복지센터 찾기
                  <ChevronRight className='ml-2 w-5 h-5' />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className='py-20 bg-gray-50'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center space-y-4 mb-16'>
            <h2 className='text-3xl sm:text-4xl font-bold text-gray-900'>
              왜 돌봄워크를 선택해야 할까요?
            </h2>
            <p className='text-xl text-gray-600'>안전하고 신뢰할 수 있는 돌봄 서비스의 시작</p>
          </div>

          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
            <Card className='text-center border-0 shadow-lg hover:shadow-xl transition-shadow bg-white'>
              <CardHeader className='pb-4'>
                <div className='w-16 h-16 bg-[#522e9a]/10 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <Shield className='w-8 h-8 text-[#522e9a]' />
                </div>
                <CardTitle className='text-xl text-[#522e9a]'>안전한 검증</CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-gray-600 text-lg leading-relaxed'>
                  모든 요양보호사의 자격증과 경력을 철저히 검증합니다
                </p>
              </CardContent>
            </Card>

            <Card className='text-center border-0 shadow-lg hover:shadow-xl transition-shadow bg-white'>
              <CardHeader className='pb-4'>
                <div className='w-16 h-16 bg-[#522e9a]/10 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <Clock className='w-8 h-8 text-[#522e9a]' />
                </div>
                <CardTitle className='text-xl text-[#522e9a]'>24시간 지원</CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-gray-600 text-lg leading-relaxed'>
                  언제든지 필요할 때 빠른 상담과 지원을 받으실 수 있습니다
                </p>
              </CardContent>
            </Card>

            <Card className='text-center border-0 shadow-lg hover:shadow-xl transition-shadow bg-white'>
              <CardHeader className='pb-4'>
                <div className='w-16 h-16 bg-[#522e9a]/10 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <MapPin className='w-8 h-8 text-[#522e9a]' />
                </div>
                <CardTitle className='text-xl text-[#522e9a]'>지역 맞춤</CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-gray-600 text-lg leading-relaxed'>
                  우리 지역 최고의 돌봄 서비스를 쉽게 찾을 수 있습니다
                </p>
              </CardContent>
            </Card>

            <Card className='text-center border-0 shadow-lg hover:shadow-xl transition-shadow bg-white'>
              <CardHeader className='pb-4'>
                <div className='w-16 h-16 bg-[#522e9a]/10 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <Heart className='w-8 h-8 text-[#522e9a]' />
                </div>
                <CardTitle className='text-xl text-[#522e9a]'>가족같은 마음</CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-gray-600 text-lg leading-relaxed'>
                  우리 가족을 돌보는 마음으로 최선의 서비스를 제공합니다
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How to use */}
      <section id='how-to-use' className='py-20 bg-white'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center space-y-4 mb-16'>
            <h2 className='text-3xl sm:text-4xl font-bold text-gray-900'>이용방법</h2>
            <p className='text-xl text-gray-600'>간단한 3단계로 돌봄 서비스를 시작하세요</p>
          </div>

          <div className='grid md:grid-cols-3 gap-8 max-w-5xl mx-auto'>
            <div className='text-center space-y-6'>
              <div className='w-20 h-20 bg-[#522e9a] rounded-full flex items-center justify-center mx-auto'>
                <span className='text-2xl font-bold text-white'>1</span>
              </div>
              <h3 className='text-2xl font-bold text-[#522e9a]'>서비스 선택</h3>
              <p className='text-lg text-gray-600 leading-relaxed'>
                요양보호사 또는 노인복지센터 중 필요한 서비스를 선택하세요
              </p>
            </div>

            <div className='text-center space-y-6'>
              <div className='w-20 h-20 bg-[#522e9a] rounded-full flex items-center justify-center mx-auto'>
                <span className='text-2xl font-bold text-white'>2</span>
              </div>
              <h3 className='text-2xl font-bold text-[#522e9a]'>매칭 신청</h3>
              <p className='text-lg text-gray-600 leading-relaxed'>
                간단한 정보 입력 후 서로 상의하세요
              </p>
            </div>

            <div className='text-center space-y-6'>
              <div className='w-20 h-20 bg-[#522e9a] rounded-full flex items-center justify-center mx-auto'>
                <span className='text-2xl font-bold text-white'>3</span>
              </div>
              <h3 className='text-2xl font-bold text-[#522e9a]'>매칭 완료</h3>
              <p className='text-lg text-gray-600 leading-relaxed'>
                맞춤형 돌봄 서비스 매칭 완료 후 안심하고 서비스를 이용하세요
              </p>
            </div>
          </div>

          <div className='text-center mt-12'>
            <Button className='text-xl px-12 py-6' onClick={() => navigate('/signin')}>
              지금 시작하기
              <ChevronRight className='ml-2 w-6 h-6' />
            </Button>
          </div>
        </div>
      </section>

      {/* Banner */}
      <section id='contact' className='py-20 bg-gradient-to-r from-[var(--main)] to-purple-700'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <div className='max-w-4xl mx-auto space-y-8'>
            <h2 className='text-3xl sm:text-4xl font-bold text-white'>지금 바로 매칭하세요</h2>
            <p className='text-xl text-purple-100 leading-relaxed'>
              전문 요양사가 대기하고 있습니다.
              <br />
              우리 가족에게 맞는 최고의 돌봄 서비스를 찾아보세요.
            </p>
            <div className='flex flex-col sm:flex-row gap-6 justify-center items-center'>
              <Button
                variant='white'
                className='text-xl px-10 py-6 hover:bg-gray-100 hover:text-[var(--main)]'
              >
                <Phone className='mr-3 w-6 h-6' />
                1588-1234 전화상담
              </Button>
              <Button
                variant='white'
                className='text-xl px-10 py-6 hover:bg-gray-100 hover:text-[var(--main)]'
                onClick={() => navigate('/signin')}
              >
                매칭하러 가기
                <ChevronRight className='ml-2 w-6 h-6' />
              </Button>
            </div>
            <p className='text-purple-200'>상담료 무료 • 24시간 운영 • 전국 서비스</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className='bg-gray-900 text-white py-16'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='border-t border-gray-800 mt-12 pt-8'>
            <div className='flex justify-between gap-4'>
              <div className='text-gray-400 text-lg text-left'>
                <p>© {new Date().getFullYear()} 돌봄워크. All rights reserved.</p>
                <p>사업자등록번호: 123-45-67890 | 대표: 홍길동</p>
              </div>
              <div className='text-gray-400 text-lg text-right'>
                <p>서울특별시 강남구 테헤란로 123 돌봄빌딩 5층</p>
                <p>통신판매업신고: 제2024-서울강남-1234호</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
