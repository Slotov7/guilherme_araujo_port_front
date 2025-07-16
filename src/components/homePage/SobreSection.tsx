import { spaceGrotesk, marope } from '@/app/fonts'; // Verifique se o caminho para suas fontes está correto

export default function SobreSection() {
    return (
        <section id="sobre" className="py-8 container mx-auto px-6 flex justify-center items-center">
            <div className={`w-full max-w-4xl bg-[#1f1f1f] rounded-2xl shadow-2xl p-3 md:p-12 flex flex-col items-center gap-4`}>
                <h2 className={`${spaceGrotesk.className} text-white text-4xl font-bold m-0 max-sm:text-3xl text-center`}>
                    Sobre
                </h2>
                <div className={`${marope.className} text-gray-300 text-lg text-center leading-relaxed space-y-3 mt-0 max-sm:text-md`}>
                    <p>Sou o Guilherme Araújo, tenho 19 anos e sou estudante de Ciência da Computação na Universidade Federal de Sergipe (UFS). Atuo como desenvolvedor backend e designer UI/UX, criando aplicações completas que integram tecnologia, usabilidade e performance.</p>
                    <p>Tenho experiência com Java, Spring Boot, Node.js, Nest.js e PostgreSQL, além de conhecimento sólido em construção de APIs REST, modelagem de banco de dados e boas práticas de desenvolvimento. No campo do design, utilizo o Figma para projetar interfaces limpas, intuitivas e centradas no usuário.</p>
                    <p>Ao longo da minha trajetória, desenvolvi projetos pessoais e acadêmicos, sempre buscando unir lógica, eficiência e uma boa experiência de uso. Estou aberto a novas oportunidades — seja em CLT, estágio ou projetos freelance — e pronto para colaborar com equipes que valorizam qualidade técnica e foco no usuário.</p>
                </div>
            </div>
        </section>
    );
}