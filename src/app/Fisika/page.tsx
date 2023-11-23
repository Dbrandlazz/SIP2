import React from "react";
import Image from "next/image";
import Navbar from "../../app/component/Navbar"
import logo from "../../../public/images/fisika.png"
import Course from "../../../public/images/course(2).png"
import Dosen from "../../../public/images/DosenInformatika.png"
import Mahasiswa from "../../../public/images/MahasiswaInformatika.png";

const PageFisika: React.FC = () => {
  return (
    <div className="bg-[#F9F8F3;] p-10 ">
      <div>
        <Navbar></Navbar>
      </div>
      <div className="flex items-center mb-10 pt-4 ">
        <Image src={logo} alt="Logo" width={70} height={70} />
        <h1 className="ml-2 text-2xl font-bold text-black">Fisika</h1>
      </div>
      <div className="p-10 bg-[#929d90] flex items-center justify-center rounded-lg">
        <p className="font-semibold text-black text-[25px] text-center tracking-[0] leading-[20px]">
        Program Studi Fisika (psf) Fmipa Universitas Syiah Kuala Didirikan Pada <br />
        <br />
        tahun 1989 Berdasarkan Surat Keputusan Direktur Jenderal Pendidikan <br />
        <br />
        tinggi Departemen Pendidikan Dan Kebudayaan Ri No. 10/dikti/kep/1989 <br />
        <br />
        tanggal 17 Februari 1989.
        </p>
      </div>
      <div className="flex items-center justify-start space-x-4">
        <div className="flex flex-col items-center w-30">
          <Image src={Course} alt="Course" width={70} height={70} />
          <h2 className="ml-2 text-xl font-bold text-black pt-2">
            69 Matakuliah
          </h2>
        </div>
        <div className="flex flex-col items-center">
          <Image src={Dosen} alt="Dosen" width={70} height={70} />
          <h3 className="ml-2 text-xl font-bold text-black mb-2">
            24 Staff Pengajar
          </h3>
        </div>
        <div className="flex flex-col items-center">
          <Image src={Mahasiswa} alt="Mahasiswa" width={80} height={80} />
          <h2 className="ml-2 text-xl font-bold text-black pt-2">
            360 Mahasiswa
          </h2>
        </div>
      </div>
    </div>
  );
};
export default PageFisika;
