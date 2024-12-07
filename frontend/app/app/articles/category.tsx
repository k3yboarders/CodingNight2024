'use client';;
import React, { useEffect, useState } from "react";
import * as Collapsible from "@radix-ui/react-collapsible";
import { ArrowDownCircleIcon, ArrowUpCircleIcon } from "@heroicons/react/24/outline";
import { HomeCard } from "@/components/app/home-card";
import { getArticles } from "@/actions/articles";
import Link from "next/link";
import { motion } from "framer-motion";

const ArticleCategory = (props: Readonly<{ title: string, categoryId: string }>) => {
	const [open, setOpen] = React.useState(true);

	const [articles, setArticles] = useState({});
	const fetchArticles = async () => {
		try {
			const response = await getArticles({ categoryId: props.categoryId });
			setArticles(response);
		} catch (error) {
			console.error("Error fetching notes:", error);
		}
	};

	useEffect(() => {
		fetchArticles();
	}, []);
	return (
		<Collapsible.Root open={open} onOpenChange={setOpen}>
			<div className="flex flex-row justify-between my-5">
				<p className="text-3xl">{props.title}</p>
				<Collapsible.Trigger asChild>
					<button className="IconButton">
						{open ? <ArrowUpCircleIcon className="size-10" /> : <ArrowDownCircleIcon className="size-10" />}
					</button>
				</Collapsible.Trigger>
			</div>

			<Collapsible.Content>
				<motion.div
					initial={{ height: 0, opacity: 0 }}
					animate={open ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
					transition={{ duration: 0.3, ease: "easeInOut" }}
					className="overflow-hidden flex flex-col gap-5"
				>
					{articles &&
						articles.data &&
						articles.data.map((article: any, key: number) => (
							<Link href={`/app/articles/${article.id}`} className="cursor-pointer" key={key}>
								<HomeCard title={article.title} icon={<></>}>
									<div key={article.id}>
										<p>{article.title}</p>
									</div>
								</HomeCard>
							</Link>
						))}
				</motion.div>
			</Collapsible.Content>
		</Collapsible.Root>
	);
};

export default ArticleCategory;