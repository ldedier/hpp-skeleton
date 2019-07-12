/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Didi.hpp                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: ldedier <ldedier@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/07/12 10:21:38 by ldedier           #+#    #+#             */
/*   Updated: 2019/07/12 10:21:41 by ldedier          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#ifndef DIDI_HPP
# define DIDI_HPP

# include <iostream>

class Didi
{
	public:
		Didi(void);
		Didi(** replace params **);
		Didi(Didi const &instance);
		Didi &operator=(Didi const &rhs);
		~Didi(void);

	private:

};

std::ostream &operator<<(std::ostream &o, Didi const &instance);
#endif