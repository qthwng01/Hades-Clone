import React from 'react'
import Link from 'next/link'
import { Facebook, Instagram } from 'lucide-react'

const policies = [
  {
    title: 'Chính sách sử dụng website',
    href: '#',
  },
  {
    title: 'Phương thức thanh toán',
    href: '#',
  },
  {
    title: 'Chính sách đổi trả',
    href: '#',
  },
  {
    title: 'Chính sách giao nhận - vận chuyển',
    href: '#',
  },
  {
    title: 'Điều khoản dịch vụ',
    href: '#',
  },
  {
    title: 'Hướng dẫn mua hàng',
    href: '#',
  },
  {
    title: 'Chính sách bảo mật',
    href: '#',
  },
]

const infos = [
  {
    title: 'CÔNG TY TNHH HADES',
  },
  {
    title: 'SỐ CSKH: 02873011021 (10h -18h)',
  },
  {
    title: 'Ngày cấp: 20/07/2020',
  },
  {
    title: 'Tuyển dụng: hr@hades.vn',
  },
  {
    title: 'Website: hades.vn',
  },
  {
    title: 'For business: contact@hades.vn',
  },
]

const Footer = () => {
  return (
    <footer className="container mx-auto w-full max-w-screen-2xl pt-4 pb-4 mt-16 px-2 md:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-y-4 md:gap-y-0 md:gap-x-8">
        <div className="mx-2">
          <h3 className="font-semibold text-[16px] mb-6">HỆ THỐNG CỬA HÀNG HADES</h3>
          <div className="font-medium font-qs text-[13px]">
            <p className="my-2">
              HADES STUDIO Store 1: 26 LY TU TRONG STREET,
              <br />
              DISTRICT 1, HOCHIMINH (THE NEW PLAYGROUND).
              <br />
              Store 2: 140 NGUYEN HY QUANG, DONG DA DISTRICT, HANOI.
              <br />
              Store 3: 4 PHAM NGU LAO STREET, DISTRICT 1, HOCHIMINH.
              <br />
              Store 4: Tầng 4, GIGA MALL, HCM.
              <br />
              Store 5: 152 TRAN QUANG DIEU, WARD 14, DISTRICT 3, HCM.
            </p>
          </div>
        </div>
        <div className="mx-2 policy">
          <h3 className="font-semibold text-[16px] mb-6">CHÍNH SÁCH</h3>
          <ul className="text-[13px] font-medium font-qs ">
            {policies.map((info, index) => (
              <li key={index} className="block relative pl-5 leading-7">
                <Link href={'#'} title={info.title}>
                  {info.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="mx-2 info">
          <h3 className="font-semibold text-[16px] mb-6">THÔNG TIN LIÊN HỆ</h3>
          <ul className="text-[13px] font-medium font-qs ">
            {infos.map((info, index) => (
              <li key={index} className="block relative pl-5 leading-7">
                <span>{info.title}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-[16px] mb-6">FOLLOW US ON SOCIAL MEDIA</h3>
          <div className="inline-flex items-center gap-x-2">
            <Link href={'#'} title="Facebook">
              <Facebook className="size-8" />
            </Link>
            <Link href={'#'} title="Instagram">
              <Instagram className="size-8" />
            </Link>
          </div>
          <div className="mt-2">
            <img src="/logo/cert.webp" alt="Cert" className="w-[200px] h-[75px] object-cover" />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
