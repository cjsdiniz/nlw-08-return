import { useState } from "react";
import { CloseButton } from "../CloseButton";
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { FeedbackSuccessStep } from "./Steps/FeedbackSuccessStep";
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";
import bugImage from '/src/assets/bug.svg';
import ideaImage from '/src/assets/idea.svg';
import thoughtImage from '/src/assets/thought.svg';

export const feedbackTypes = {
    BUG: {
        title: "Problema",
        image: {
            source: bugImage,
            alt: 'Problema'
        }
    },
    IDEA: {
        title: "Ideia",
        image: {
            source: ideaImage,
            alt: 'Ideia'
        }
    },
    OTHER: {
        title: "Outro",
        image: {
            source: thoughtImage,
            alt: 'Outro'
        }

    },
};

export type FeedbackType = keyof typeof feedbackTypes;

export function WidgetForm() {


    const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
    const [feedbackSent, setFeedbackSent] = useState(false);

    // function toggleWidgetVisibility() {
    //     setIsWidgetOpen(!isWidgetOpen);
    // }

    function handleRestartFeedback() {
        setFeedbackSent(false);
        setFeedbackType(null);
    }

    return (
        <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">

            {/* <p> Hello World</p> */}
            {feedbackSent ? (
                <FeedbackSuccessStep onFeedbackRestartRequested={handleRestartFeedback} />
            ) : (
                <>
                    {!feedbackType ? (
                        <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
                    ) : (
                        <FeedbackContentStep
                            feedbackType={feedbackType}
                            onFeedbackRestartRequested={handleRestartFeedback}
                            onFeedbackSent={() => setFeedbackSent(true)}
                        />
                    )}
                </>
            )
            }

            <footer className="text-xs text-neutral-400">
                Feito com ♥ pela <a className="underline underline-offset-2" href="https://rocketseat.com.br" target="_blank">Rocketseat</a>
            </footer>
        </div >
    );
}