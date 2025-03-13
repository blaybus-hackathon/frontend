import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import useCareTypeStore, { CARE_TYPES } from '@/store/suho/useCareTypeStore';

export default function AccountCareType() {
    const navigate = useNavigate();
    const { selectedTypes, toggleWorkType, setSelection } = useCareTypeStore();

    const handleSave = () => {
        // 필수 선택 항목 체크 (예: 근무 종류는 최소 1개 이상)
        if (selectedTypes.workTypes.length === 0) {
            alert('근무 종류를 최소 1개 이상 선택해주세요.');
            return;
        }
        navigate('/helper/account/edit');
    };

    return (
        <main className="max-w-md mx-auto flex flex-col gap-6 p-4">
            <Header title="돌봄 유형 설정" />

            {/* 근무 종류 (다중 선택) */}
            <section className="space-y-2">
                <h2 className="font-semibold">근무 종류 (다중 선택 가능)</h2>
                <div className="grid grid-cols-3 gap-2">
                    {CARE_TYPES.workTypes.map(({ id, label }) => (
                        <Button
                            key={id}
                            type="button"
                            variant={selectedTypes.workTypes.includes(id) ? "default" : "outline"}
                            onClick={() => toggleWorkType(id)}
                        >
                            {label}
                        </Button>
                    ))}
                </div>
            </section>

            {/* 장기요양등급 */}
            <section className="space-y-2">
                <h2 className="font-semibold">장기요양등급</h2>
                <div className="grid grid-cols-3 gap-2">
                    {CARE_TYPES.careGrade.map(({ id, label }) => (
                        <Button
                            key={id}
                            type="button"
                            variant={selectedTypes.careGrade === id ? "default" : "outline"}
                            onClick={() => setSelection('careGrade', id)}
                        >
                            {label}
                        </Button>
                    ))}
                </div>
            </section>

            {/* 성별 */}
            <section className="space-y-2">
                <h2 className="font-semibold">성별</h2>
                <div className="grid grid-cols-2 gap-2">
                    {CARE_TYPES.gender.map(({ id, label }) => (
                        <Button
                            key={id}
                            type="button"
                            variant={selectedTypes.gender === id ? "default" : "outline"}
                            onClick={() => setSelection('gender', id)}
                        >
                            {label}
                        </Button>
                    ))}
                </div>
            </section>

            {/* 동거인 여부 */}
            <section className="space-y-2">
                <h2 className="font-semibold">동거인 여부</h2>
                <div className="grid grid-cols-2 gap-2">
                    {CARE_TYPES.livingArrangement.map(({ id, label }) => (
                        <Button
                            key={id}
                            type="button"
                            variant={selectedTypes.livingArrangement === id ? "default" : "outline"}
                            onClick={() => setSelection('livingArrangement', id)}
                        >
                            {label}
                        </Button>
                    ))}
                </div>
            </section>

            {/* 식사보조 */}
            <section className="space-y-2">
                <h2 className="font-semibold">식사보조</h2>
                <div className="grid grid-cols-2 gap-2">
                    {CARE_TYPES.mealCare.map(({ id, label }) => (
                        <Button
                            key={id}
                            type="button"
                            variant={selectedTypes.mealCare === id ? "default" : "outline"}
                            onClick={() => setSelection('mealCare', id)}
                        >
                            {label}
                        </Button>
                    ))}
                </div>
            </section>

            {/* 이동보조 */}
            <section className="space-y-2">
                <h2 className="font-semibold">이동보조</h2>
                <div className="grid grid-cols-2 gap-2">
                    {CARE_TYPES.mobilitySupport.map(({ id, label }) => (
                        <Button
                            key={id}
                            type="button"
                            variant={selectedTypes.mobilitySupport === id ? "default" : "outline"}
                            onClick={() => setSelection('mobilitySupport', id)}
                        >
                            {label}
                        </Button>
                    ))}
                </div>
            </section>

            {/* 일상생활 */}
            <section className="space-y-2">
                <h2 className="font-semibold">일상생활</h2>
                <div className="grid grid-cols-2 gap-2">
                    {CARE_TYPES.dailyLife.map(({ id, label }) => (
                        <Button
                            key={id}
                            type="button"
                            variant={selectedTypes.dailyLife === id ? "default" : "outline"}
                            onClick={() => setSelection('dailyLife', id)}
                        >
                            {label}
                        </Button>
                    ))}
                </div>
            </section>

            {/* 저장 버튼 */}
            <Button
                onClick={handleSave}
                className="w-full mt-4"
            >
                저장하기
            </Button>
        </main>
    );
}